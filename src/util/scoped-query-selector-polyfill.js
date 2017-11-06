
// ES6-ified from https://github.com/lazd/scopedQuerySelectorShim/

// Match usage of scope
const scopeRE = /^\s*:scope/gi;

function overrideNodeMethod(prototype, methodName, container) {
  // Store the old method for use later
  const oldMethod = prototype[methodName];
  // Override the method
  prototype[methodName] = function newMethod(query) {
    let nodeList;
    let gaveId = false;
    let gaveContainer = false;
    if (query.match(scopeRE)) {
      // Remove :scope
      query = query.replace(scopeRE, '');
      if (!this.parentNode) {
        // Add to temporary container
        container.appendChild(this);
        gaveContainer = true;
      }
      const { parentNode } = this;
      if (!this.id) {
        // Give temporary ID
        this.id = `rootedQuerySelector_id_${new Date().getTime()}`;
        gaveId = true;
      }
      // Find elements against parent node
      nodeList = oldMethod.call(parentNode, `#${this.id} ${query}`);
      // Reset the ID
      if (gaveId) {
        this.id = '';
      }
      // Remove from temporary container
      if (gaveContainer) {
        container.removeChild(this);
      }
      return nodeList;
    }
    // No immediate child selector used
    return oldMethod.call(this, query);
  };
}

export default function scopedQuerySelectorPolyfill() {
  // eslint-disable-next-line no-undef
  if (!HTMLElement.prototype.querySelectorAll) {
    throw new Error('rootedQuerySelectorAll: This polyfill can only be used with browsers that support querySelectorAll');
  }
  // A temporary element to query against for elements not currently in the DOM
  // We'll also use this element to test for :scope support
  const container = document.createElement('div');
  // Check if the browser supports :scope
  try {
    // Browser supports :scope, do nothing
    container.querySelectorAll(':scope *');
  } catch (e) {
    // Overrides
    // Browser doesn't support :scope, add polyfill
    // eslint-disable-next-line no-undef
    overrideNodeMethod(HTMLElement.prototype, 'querySelector', container);
    // eslint-disable-next-line no-undef
    overrideNodeMethod(HTMLElement.prototype, 'querySelectorAll', container);
  }
}
