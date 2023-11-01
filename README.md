# Character Counter for ChatGPT

This repository contains a JavaScript script that adds a character counter to the OpenAI ChatGPT interface, helping users to keep track of their input length. It also includes functionality to toggle between character limits for different GPT models and to hide/show the character counter.

## Features

- **Character Counter**: Displays the number of characters typed in the chat box and the maximum allowed characters.
- **Toggle GPT Model**: Allows users to switch between GPT-3.5 and GPT-4 character limits (4000 and 25000 characters respectively).
- **Toggle Counter Visibility**: Provides an option to hide or show the character counter.

## Installation

### As a Bookmarklet

1. **Create a Bookmarklet**:
   - Create a new bookmark in your browser.
   - Name it something like "ChatGPT Counter".
   - In the URL field, paste the minified version of the JavaScript code.

2. **Minify the JavaScript Code**:
   - You can use an online tool like [JSCompress](https://jscompress.com/) to minify the JavaScript code from the `script.js` file.
   - Copy the minified code and paste it into the URL field of the bookmark you created.

### As a Temporary Extension

#### Firefox

1. **Create a Manifest File**:
   - Create a `manifest.json` file with the following content:

     ```json
     {
       "manifest_version": 2,
       "name": "ChatGPT Counter",
       "version": "1.0",
       "description": "Character counter for ChatGPT",
       "content_scripts": [
         {
           "matches": ["https://chat.openai.com/*"],
           "js": ["script.js"]
         }
       ]
     }
     ```

2. **Load as Temporary Add-on**:
   - Open Firefox and go to `about:debugging`.
   - Click on "This Firefox" (or "Load Temporary Add-on" in older versions).
   - Navigate to the directory containing your `script.js` and `manifest.json` files.
   - Select any one of the files to load the extension.

#### Chromium Browsers (Chrome, Edge, etc.)

1. **Create a Manifest File**:
   - Follow the same steps as in the Firefox section to create a `manifest.json` file.

2. **Load as Unpacked Extension**:
   - Open your Chromium browser and go to `chrome://extensions/`.
   - Enable "Developer mode" at the top right.
   - Click "Load unpacked" and select the directory containing your `script.js` and `manifest.json` files.

## Usage

1. **Open ChatGPT**: Navigate to the OpenAI ChatGPT interface in your browser.
2. **Activate the Script**:
   - If you installed it as a bookmarklet, click on the "ChatGPT Counter" bookmark.
   - If you installed it as a temporary extension, it should be active by default.
3. **Use the Features**:
   - The character counter will appear immediately.
   - Use the "Toggle GPT Model" button to switch between GPT-3.5 and GPT-4 character limits.
   - Use the "Toggle Counter Visibility" button to hide or show the character counter.

## Contributing

Contributions are welcome! If you have suggestions or want to improve the script, feel free to create an issue or submit a pull request.

## License

This project is open-source and available under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Please note that this script is a third-party tool and is not officially provided or supported by OpenAI. Use it at your own risk.
