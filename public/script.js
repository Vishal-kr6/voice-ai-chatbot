const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const startBtn = document.getElementById('start-btn');
const micIndicator = document.getElementById('mic-indicator');
const typingIndicator = document.getElementById('typing-indicator');
const darkModeToggle = document.getElementById('dark-mode-toggle');

const LS_KEY = "voice-chatbot-history";

// --- Chat history ---
function saveHistory() {
  localStorage.setItem(LS_KEY, chatLog.innerHTML);
}
function loadHistory() {
  const saved = localStorage.getItem(LS_KEY);
  if (saved) chatLog.innerHTML = saved;
}
function clearHistory() {
  localStorage.removeItem(LS_KEY);
  chatLog.innerHTML = '';
}

// --- Dark mode ---
function setDarkMode(on) {
  document.body.classList.toggle('dark', on);
  darkModeToggle.innerText = on ? "☀️" : "🌙";
  localStorage.setItem("vcb-dark", on ? "1" : "0");
}
darkModeToggle.onclick = () => {
  setDarkMode(!document.body.classList.contains('dark'));
};
if (localStorage.getItem("vcb-dark") === "1") setDarkMode(true);

// --- Speech Recognition setup ---
let recognition, recognizing = false;
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.onstart = () => {
    recognizing = true;
    startBtn.classList.add("active");
  };
  recognition.onend = () => {
    recognizing = false;
    startBtn.classList.remove("active");
  };
  recognition.onerror = () => {
    recognizing = false;
    startBtn.classList.remove("active");
  };
  recognition.onresult = (e) => {
    const speech = e.results[0][0].transcript;
    userInput.value = speech;
    handleSend();
  };
} else {
  startBtn.disabled = true;
  startBtn.innerText = "No Speech";
}

// --- Text-to-Speech ---
function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  window.speechSynthesis.speak(utter);
}

// --- Add message to chat log ---
function addMessage(sender, text, save=true) {
  const bubble = document.createElement('div');
  bubble.className = `bubble ${sender === 'user' ? 'user-bubble' : 'bot-bubble'}`;
  bubble.innerText = text;
  chatLog.appendChild(bubble);
  chatLog.scrollTop = chatLog.scrollHeight;
  if (save) saveHistory();
}

// --- Typing indicator ---
function showTyping(on) {
  typingIndicator.classList.toggle('hidden', !on);
}

// --- Enhanced AI logic with more rules ---
function botReply(msg) {
  const m = msg.toLowerCase();
  // Greetings
  if (/^(hi|hello|hey)\b/.test(m)) return "Hello! 👋 How can I help you today?";
  if (/\bhow are you\b/.test(m)) return "I'm just code, but I'm feeling helpful!";
  // Weather
  if (m.includes("weather")) return "I can't check live weather yet, but I hope it's sunny where you are!";
  // Name
  if (m.includes("name")) return "I'm your friendly voice chatbot.";
  // Jokes
  if (m.includes("joke")) return "Why did the computer show up at work late? It had a hard drive!";
  // Time/date
  if (m.includes("time")) return `It's ${new Date().toLocaleTimeString()}.`;
  if (m.includes("date")) return `Today is ${new Date().toLocaleDateString()}.`;
  // Clear chat
  if (m.includes("clear chat")) {
    clearHistory();
    return "Chat history cleared!";
  }
  // Bye
  if (/\b(bye|goodbye|see you|cya)\b/.test(m)) return "Goodbye! 👋";
  // Math
  if (/(\d+)\s*([\+\-\*\/])\s*(\d+)/.test(m)) {
    try {
      // Evaluate simple arithmetic
      // eslint-disable-next-line no-eval
      return "The answer is: " + eval(m.match(/(\d+\s*[\+\-\*\/]\s*\d+)/)[0]);
    } catch { return "Sorry, couldn't compute that."; }
  }
  // Fallback
  return "Sorry, I didn't understand that. Can you rephrase?";
}

// --- Send handler ---
let botTimeout = null;
function handleSend() {
  const text = userInput.value.trim();
  if (!text) return;
  addMessage('user', text);
  userInput.value = '';
  showTyping(true);
  // Simulate bot typing delay
  clearTimeout(botTimeout);
  botTimeout = setTimeout(() => {
    // You can swap this with an async API call for OpenAI/Gemini if you wish.
    const reply = botReply(text);
    addMessage('bot', reply);
    showTyping(false);
    speak(reply);
  }, 900 + Math.random() * 900);
}

// --- Microphone button ---
startBtn.onclick = () => {
  if (recognition && !recognizing) recognition.start();
};

// --- Send button and Enter key ---
sendBtn.onclick = handleSend;
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSend();
});

// --- Load chat on startup ---
loadHistory();
chatLog.scrollTop = chatLog.scrollHeight;
