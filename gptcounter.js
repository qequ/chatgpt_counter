// Global variable to store the character limit
let charLimit = 25000; // Default to GPT-4
let isCounterVisible = true;

/**
 * Counts characters in the chat box and updates the counter.
 */
function countCharacters() {
  const chatBox = getChatBox();
  if (!chatBox) {
    console.log('Chat box not found');
    return;
  }

  const text = chatBox.value || '';
  const charCount = text.length;
  console.log('Character Count:', charCount);

  updateOrCreateCounter(charCount);
}

/**
 * Gets the chat box element.
 * @returns {HTMLElement} The chat box element.
 */
function getChatBox() {
  const xpath = "//*[@id='prompt-textarea']";
  return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

/**
 * Updates the character counter, or creates it if it doesn't exist.
 * @param {number} charCount - The current character count.
 */
function updateOrCreateCounter(charCount) {
  let counter = document.getElementById('char-counter');
  if (!counter) {
    counter = createCounter();
  }

  counter.textContent = `${charCount}/${charLimit}`;


  // Update the counter visibility
  counter.style.display = isCounterVisible ? 'block' : 'none';
}

/**
 * Creates the character counter element.
 * @returns {HTMLElement} The created counter element.
 */
function createCounter() {
  const counter = document.createElement('div');
  counter.id = 'char-counter';
  Object.assign(counter.style, {
    position: 'absolute',
    top: '0',
    right: '50px',
    padding: '5px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '12px',
    color: '#333'
  });

  const chatBox = getChatBox();
  if (chatBox) {
    chatBox.parentNode.insertBefore(counter, chatBox.nextSibling);
  }

  return counter;
}

/**
 * Toggles between GPT-3.5 and GPT-4 character limits.
 */
function toggleModel() {
  charLimit = charLimit === 25000 ? 4000 : 25000;
  countCharacters();
}

// Function to toggle the counter visibility
function toggleCounterVisibility() {
  isCounterVisible = !isCounterVisible;
  updateOrCreateCounter(document.getElementById('prompt-textarea').value.length);
}

/**
 * Creates the toggle button.
 */
function createToggleButton() {
  const button = document.createElement('button');
  Object.assign(button, {
    textContent: 'Toggle GPT Model',
    onclick: toggleModel
  });
  Object.assign(button.style, {
    position: 'fixed',
    top: '10px',
    right: '5px', // Adjusted from '10px' to '5px'
    padding: '5px 10px',
    fontSize: '12px'
  });

  document.body.appendChild(button);
}


// Function to create the show/hide counter button
function createToggleCounterButton() {
  const button = document.createElement('button');
  Object.assign(button, {
    textContent: 'Toggle Counter Visibility',
    onclick: toggleCounterVisibility
  });
  Object.assign(button.style, {
    position: 'fixed',
    top: '40px',
    right: '10px',
    padding: '5px 10px',
    fontSize: '12px'
  });

  document.body.appendChild(button);
}

/**
 * Initializes the extension.
 */
function initExtension() {
  console.log('ChatGPT detected');
  createToggleButton();
  createToggleCounterButton();
  countCharacters();

  const chatBox = getChatBox();
  if (chatBox) {
    const observer = new MutationObserver(countCharacters);
    observer.observe(chatBox, { attributes: true, childList: true, subtree: true });
  }

  const bodyObserver = new MutationObserver(() => {
    if (!document.getElementById('char-counter')) {
      countCharacters();
    }
  });
  bodyObserver.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === "loading") {
  document.addEventListener('DOMContentLoaded', initExtension);
} else {
  initExtension();
}
