// --- Selectors ---
const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatWindow = document.getElementById('chatWindow');
const lengthToggle = document.getElementById('lengthToggle');
const newChatBtn = document.querySelector('.new-chat-btn'); // Select New Chat Button
const historyList = document.querySelector('.history-list'); // Select History List

// --- Configuration ---
const DEFAULT_GREETING = "Hello! I'm TurboMate. I can help you summarize documents, draft essays, or answer questions. How can I help you today?";

// --- Functions ---

// 1. Helper to add a message bubble to the UI
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    
    if (sender === 'user') {
        messageDiv.classList.add('user-message');
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
            <div class="message-avatar user-avatar">AD</div>
        `;
    } else {
        messageDiv.classList.add('ai-message');
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fa-solid fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${text}</p>
            </div>
        `;
    }

    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto scroll to bottom
}

// 2. Handle the "Send" Logic
function handleSend() {
    const text = userInput.value.trim();
    if (text === "") return;

    // Add User Message
    addMessage(text, 'user');
    userInput.value = ''; // Clear input

    // Simulate AI Response
    const isDetailed = lengthToggle.checked;
    
    // Show a temporary "Thinking..." state (Optional improvement)
    setTimeout(() => {
        let response = "Here is the short answer.";
        if(isDetailed) {
            response = "Here is a detailed breakdown of your request based on our database analysis. I have considered multiple factors to ensure accuracy...";
        }
        addMessage(response, 'ai');
    }, 800);
}

// 3. Logic to Start a New Chat & Save History
function startNewChat() {
    // A. Check if there are actually user messages to save
    const firstUserMessage = chatWindow.querySelector('.user-message p');
    
    if (firstUserMessage) {
        // Get the text from the first message to use as the Title
        let chatTitle = firstUserMessage.innerText;
        
        // Truncate if it's too long (e.g., "Write me an essay about..." -> "Write me an essay...")
        if (chatTitle.length > 25) {
            chatTitle = chatTitle.substring(0, 25) + "...";
        }

        // Create the new list item
        const historyItem = document.createElement('li');
        historyItem.innerText = chatTitle;
        
        // Add click event to history item (just for visual effect in this demo)
        historyItem.addEventListener('click', function() {
            // Remove active class from all items
            document.querySelectorAll('.history-list li').forEach(li => li.classList.remove('active'));
            // Add active class to this one
            this.classList.add('active');
        });

        // Add to the TOP of the list (prepend)
        historyList.prepend(historyItem);
    }

    // B. Clear the Chat Window
    chatWindow.innerHTML = '';

    // C. Add the Default AI Greeting back
    addMessage(DEFAULT_GREETING, 'ai');
    
    // D. Reset active classes in sidebar (optional)
    document.querySelectorAll('.history-list li').forEach(li => li.classList.remove('active'));
}

// --- Event Listeners ---

// Send Button
sendBtn.addEventListener('click', handleSend);

// Enter Key
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); 
        handleSend();
    }
});

// New Chat Button Listener
newChatBtn.addEventListener('click', startNewChat);

// Initialize: Make sure the greeting is there on first load
// (We can clear the hardcoded HTML in index.html and let JS handle it, 
// OR just leave the hardcoded HTML for the first load. 
// If you remove the hardcoded HTML in index.html, uncomment the line below:)
// startNewChat();