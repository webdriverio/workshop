import path from 'path'
import url from 'url'
import fs from 'fs/promises'

import { z } from 'zod'
import { OpenAI } from 'openai'
import logger from '@wdio/logger'
import { zodResponseFormat } from 'openai/helpers/zod'
import type { Services } from '@wdio/types'

import { captureAccessibilityTree } from './scripts/getA11yTree.js'
import type { ValidationServiceOptions } from './types.js'

const log = logger('wdio:validate-service')

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const a11yScript = path.resolve(__dirname, 'thirdParty', 'dom-accessibility-api.js')
const a11yScriptContent = await fs.readFile(a11yScript, 'utf-8')
const getCssSelectorScript = path.resolve(__dirname, 'thirdParty', 'get-css-selector.js')
const getCssSelectorScriptContent = await fs.readFile(getCssSelectorScript, 'utf-8')

const validatePromptSchema = z.object({
  result: z.boolean(),
  hint: z.string().optional()
})

export default class ValidationService implements Services.ServiceInstance {
  #client: OpenAI
  #browser?: WebdriverIO.Browser

  constructor(options: ValidationServiceOptions) {
    /**
     * initialize OpenAI client
     */
    this.#client = new OpenAI({
      apiKey: options.token
    })
  }

  async before (_: never, __: never, browser: WebdriverIO.Browser) {
    this.#browser = browser

    /**
     * register scripts
     */
    const contextId = await browser.getWindowHandle()
    await Promise.all([
      this.#registerScripts(a11yScriptContent, contextId),
      this.#registerScripts(getCssSelectorScriptContent, contextId)
    ])

    /**
     * add validate command to browser
     */
    log.info(`Adding validate command to browser`)
    browser.addCommand('validate', this.#validate.bind(this))
  }

  /**
   * Custom command to validate the current state of the application
   * @param prompt - The prompt to validate
   * @returns nothing, but throws an error if the validation is invalid
   */
  async #validate(prompt: string): Promise<void> {
    if (!this.#browser) {
      throw new Error('Browser instance not found! Make sure to call `before` method first.')
    }

    log.info(`Validating prompt: ${prompt}`)
    const state = JSON.stringify(await this.#browser.execute(captureAccessibilityTree))
    const completion = await this.#client.beta.chat.completions.parse({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `
            You are a testing expert. You are given a state of the application and a prompt.
            You need to validate if the prompt is valid for the given state.
            The state is a JSON object that contains the accessibility tree of the application:

            \`\`\`json
            ${state}
            \`\`\`

            Make sure to either return as result \`true\` if the prompt is valid for the given
            state or \`false\` otherwise.

            If the prompt is invalid, return \`false\` as result and provide a hint why it is invalid.
          `
        }, {
          role: 'user',
          content: prompt
        }
      ],
      response_format: zodResponseFormat(validatePromptSchema, 'validatePromptResponse')
    })

    const { result, hint } = completion.choices[0].message.parsed || { result: false, hint: 'Invalid response from AI' }
    if (!result) {
      throw new Error(`Validation failed: ${hint}`)
    }
  }

  /**
   * Register a script in the browser for the current context and future page loads
   * with the given context.
   *
   * @param fn - The script to register
   * @param contextId - The context to register the script in
   * @returns A promise that resolves when the script is registered
   */
  #registerScripts (fn: string, contextId: string) {
    if (!this.#browser) {
      return
    }

    function handleScriptError (err: unknown) {
      const error = err instanceof Error ? err : new Error(`unknown error: ${err}`)
      log.error('⚠️ Error adding script', error.message)
    }

    const functionDeclaration = `${fn}`
    return Promise.all([
      this.#browser.scriptAddPreloadScript({
        functionDeclaration,
        contexts: [contextId]
      }).catch(handleScriptError),
      this.#browser.scriptCallFunction({
        functionDeclaration,
        target: { context: contextId },
        awaitPromise: false
      }).catch(handleScriptError)
    ])
  }
}