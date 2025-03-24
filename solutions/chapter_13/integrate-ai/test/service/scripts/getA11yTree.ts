interface NodeInfo {
  // xpath: string
  cssSelector: string
  tagName: string
  role?: string
  name?: string | null
  description?: string
  isDisabled?: boolean
  isAccessible: boolean
  children?: NodeInfo[]
  attributes?: Record<string, string>
  isVisible: boolean
  value?: string
  textContent?: string
}

declare global {
  interface Window {
    __wdioDomAccessibilityAPI: {
      computeAccessibleDescription: (node: HTMLElement) => string
      computeAccessibleName: (node: HTMLElement) => string
      getRole: (node: HTMLElement) => string
      isDisabled: (node: HTMLElement) => boolean
      isInaccessible: (node: HTMLElement) => boolean
      isSubtreeInaccessible: (node: HTMLElement) => boolean
    }
    __wdioGetXPath: (node: HTMLElement) => string
    __wdioGetCssSelector: (node: HTMLElement) => string
  }
}

export function captureAccessibilityTree(root = document.body) {
  // Using native Accessibility APIs
  if (!window.getComputedStyle) {
    return null
  }

  /**
   * injected via `addInitScript` after session initialization
   */
  const {
    computeAccessibleDescription,
    computeAccessibleName,
    getRole,
    isDisabled,
    isInaccessible,
  } = window.__wdioDomAccessibilityAPI
  // const getXPath = window.__wdioGetXPath
  const getCssSelector = window.__wdioGetCssSelector

  function processNode(node: HTMLElement) {
    const isVisible = node.checkVisibility({
      opacityProperty: true,
      visibilityProperty: true,
      contentVisibilityAuto: true
    })
    // const xpath = getXPath(node)
    const cssSelector = getCssSelector(node)
    const isInaccessibleProp = isInaccessible(node)
    const role = getRole(node)
    const name = computeAccessibleName(node)
    const description = computeAccessibleDescription(node)
    const isDisabledProp = isDisabled(node)

    /**
     * If the node is not visible and not accessible, we can skip it
     */
    if (!isVisible && isInaccessibleProp) {
      return null
    }

    // Collect all attributes
    const attributes = Array.from(node.attributes)
      .reduce((attributes, attr) => {
        attributes[attr.name] = attr.value
        return attributes
      }, {} as Record<string, string>)

    // Process child nodes
    const children = Array.from(node.children)
      .reduce((c, child) => {
        const childInfo = processNode(child as HTMLElement)
        if (childInfo) {
          c.push(childInfo)
        }
        return c
      }, [] as NodeInfo[])

    const nodeInfo: NodeInfo = {
      // xpath,
      cssSelector,
      tagName: node.tagName,
      isVisible,
      isAccessible: !isInaccessibleProp,
      ...(Object.keys(attributes).length > 0 ? { attributes } : {})
    }

    const textContent = Array.from(node.childNodes)
      .filter((child) => child.nodeType === Node.TEXT_NODE)
      .map((child) => child.textContent)
      .filter(Boolean)
      .join(' ')

    if (role) {
      nodeInfo.role = role
    }

    if (name) {
      nodeInfo.name = name
    }

    if (textContent) {
      nodeInfo.textContent = textContent
    }

    if (description) {
      nodeInfo.description = description
    }

    if (children.length > 0) {
      nodeInfo.children = children
    }

    if (isDisabledProp) {
      nodeInfo.isDisabled = isDisabledProp
    }

    if ('value' in node && node.value && typeof node.value === 'string') {
      nodeInfo.value = node.value
    }

    return nodeInfo
  }

  return processNode(root)
}