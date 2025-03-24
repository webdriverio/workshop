export interface ValidationServiceOptions {
  /**
   * OpenAI API key
   */
  token: string
}

/**
 * Extend the WebdriverIO browser object with a custom command
 */
declare global {
  namespace WebdriverIO {
    interface Browser {
      /**
       * Validate the current state of the application
       * @param prompt - The prompt to validate
       * @returns nothing, but throws an error if the validation is invalid
       */
      validate: (prompt: string) => Promise<void>
    }

    interface ServiceOption extends ValidationServiceOptions {}
  }
}