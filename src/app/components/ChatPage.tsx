import { useEffect } from 'react';
import '../../frontend/chat-styles.css';

export default function ChatPage() {
  useEffect(() => {
    // State
    let messages: Array<{ type: string; text: string }> = [];

    // Cities data
    const cities = ['Milano', 'Roma', 'Torino', 'Napoli', 'Bologna', 'Firenze'];

    // Add message to chat
    function addMessage(type: string, text: string, isHTML = false) {
      const messagesContainer = document.getElementById('chatMessages');
      if (!messagesContainer) return;

      const messageDiv = document.createElement('div');
      messageDiv.className = `chat-message ${type}`;
      
      const bubble = document.createElement('div');
      bubble.className = 'message-bubble';
      
      if (isHTML) {
        bubble.innerHTML = text;
      } else {
        bubble.textContent = text;
      }
      
      messageDiv.appendChild(bubble);
      messagesContainer.appendChild(messageDiv);

      // Scroll to bottom
      setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 100);

      messages.push({ type, text });
    }

    // Show location options
    function showLocationOptions() {
      const messagesContainer = document.getElementById('chatMessages');
      if (!messagesContainer) return;

      const messageDiv = document.createElement('div');
      messageDiv.className = 'chat-message bot';
      
      const bubble = document.createElement('div');
      bubble.className = 'message-bubble';
      
      // Location button
      const locationBtn = document.createElement('button');
      locationBtn.className = 'location-button';
      locationBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        Usa la mia posizione
      `;
      
      locationBtn.addEventListener('click', handleLocationClick);
      bubble.appendChild(locationBtn);

      // City selection
      const citySelection = document.createElement('div');
      citySelection.className = 'city-selection';
      
      const label = document.createElement('div');
      label.className = 'city-selection-label';
      label.textContent = 'oppure scegli una città';
      citySelection.appendChild(label);

      const cityButtons = document.createElement('div');
      cityButtons.className = 'city-buttons';

      cities.forEach(city => {
        const btn = document.createElement('button');
        btn.className = 'city-btn';
        btn.textContent = city;
        btn.addEventListener('click', () => handleCityClick(city));
        cityButtons.appendChild(btn);
      });

      // Add "Altro..." button
      const otherBtn = document.createElement('button');
      otherBtn.className = 'city-btn outline';
      otherBtn.textContent = 'Altro...';
      otherBtn.addEventListener('click', handleOtherClick);
      cityButtons.appendChild(otherBtn);

      citySelection.appendChild(cityButtons);
      bubble.appendChild(citySelection);

      messageDiv.appendChild(bubble);
      messagesContainer.appendChild(messageDiv);

      // Scroll to bottom
      setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 100);
    }

    // Handle location button click
    function handleLocationClick() {
      addMessage('user', 'Usa la mia posizione');
      
      setTimeout(() => {
        addMessage('bot', 'Perfetto! Sto cercando i cinema vicino a te...');
      }, 500);
    }

    // Handle city button click
    function handleCityClick(city: string) {
      addMessage('user', city);
      
      setTimeout(() => {
        addMessage('bot', `Ottimo! Ti mostro i cinema disponibili a ${city}.`);
      }, 500);
    }

    // Handle "Altro..." button click
    function handleOtherClick() {
      addMessage('user', 'Altra città');
      
      setTimeout(() => {
        addMessage('bot', 'Quale città preferisci?');
      }, 500);
    }

    // Handle send message
    function handleSendMessage() {
      const chatInput = document.getElementById('chatInput') as HTMLInputElement;
      if (!chatInput) return;

      const message = chatInput.value.trim();
      if (!message) return;

      addMessage('user', message);
      chatInput.value = '';

      // Bot response (mock)
      setTimeout(() => {
        addMessage('bot', 'Grazie per il messaggio! Sto elaborando la tua richiesta...');
      }, 500);
    }

    // Setup event listeners
    function setupEventListeners() {
      const chatInput = document.getElementById('chatInput');
      const sendBtn = document.getElementById('sendBtn');

      if (sendBtn) {
        sendBtn.addEventListener('click', handleSendMessage);
      }

      if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }
        });
      }
    }

    // Initialize
    const initialMessages = [
      { type: 'bot', text: 'Ciao! 👋' },
      { type: 'bot', text: 'Dove vuoi vedere No Other Choice?' }
    ];

    initialMessages.forEach(msg => {
      addMessage(msg.type, msg.text);
    });

    showLocationOptions();
    setupEventListeners();
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-wrapper">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-content">
            <svg className="chat-header-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
            <span className="chat-header-title">Trova il tuo cinema</span>
          </div>
          <button className="chat-close-btn" aria-label="Chiudi">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="chat-messages" id="chatMessages">
          {/* Messages will be generated by JavaScript */}
        </div>

        {/* Input Area */}
        <div className="chat-input-area">
          <input 
            type="text" 
            placeholder="Scrivi un messaggio..." 
            className="chat-input"
            id="chatInput"
          />
          <button className="chat-send-btn" id="sendBtn" aria-label="Invia">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
