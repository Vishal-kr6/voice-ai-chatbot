# Voice-Enabled AI Chatbot

A modern, voice-enabled AI chatbot web app inspired by [Smashing Magazine's article](https://www.smashingmagazine.com/2017/08/ai-chatbot-web-speech-api-node-js/).

**Features:**
- Speech-to-text (Web Speech API)
- Text-to-speech (Speech Synthesis)
- Persistent chat history (LocalStorage)
- Bot typing indicator
- Microphone visual feedback
- Responsive, mobile-friendly design
- Dark mode toggle
- Easily extensible (swap in OpenAI/Gemini for bot logic)

## Quick Start

1. **Install Node.js** (if serving with backend)
2. **Run:**
    ```
    npm install
    npm start
    ```
3. Open [http://localhost:3000](http://localhost:3000) in Chrome.

Or, simply open `public/index.html` in your browser.

## File Structure

```
voice-chatbot/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js           # (for Node.js static serving)
├── package.json
└── README.md
```

## Custom Bot Logic

The bot logic is in `script.js` (`botReply()` function).  
You can upgrade it to use an API for smarter responses.

## Credits

- [Smashing Magazine](https://www.smashingmagazine.com/2017/08/ai-chatbot-web-speech-api-node-js/)
- [MDN Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
