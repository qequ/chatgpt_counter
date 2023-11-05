// Global variable to store the character limit
let charLimit;
let isCounterVisible;

function updateSettings(mode) {
  switch (mode) {
    case 'gpt-3.5':
      charLimit = 4000;
      isCounterVisible = true;
      break;
    case 'gpt-4':
      charLimit = 25000;
      isCounterVisible = true;
      break;
    case 'hide':
      isCounterVisible = false;
      break;
    default:
      console.error('Unknown mode:', mode);
  }
}

chrome.storage.local.get('mode', (result) => {
  updateSettings(result.mode || 'gpt-4');
  // Call countCharacters to update the counter
  countCharacters();
});


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

// Define getBrowser function at the top-level scope
function getBrowser() {
  if (typeof chrome !== 'undefined') {
    return chrome;
  } else if (typeof browser !== 'undefined') {
    return browser;
  } else {
    console.error('This script is not running in a supported browser.');
    return null;
  }
}

// Define browserObject at the top-level scope
const browserObject = getBrowser();

// Now add your message listener

if (browserObject) {
  browserObject.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "updateSettings") {
      updateSettings(request.mode);
      countCharacters();  // Update the counter
    }
  });
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

  // Change color to red if limit reached or exceeded, otherwise set it to black
  if (charCount >= charLimit) {
    counter.style.color = 'red';
  } else {
    counter.style.color = 'black';
  }
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
 * Initializes the extension.
 */
function initExtension() {
  console.log('ChatGPT detected');
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
