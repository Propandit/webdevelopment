const apiKey = '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';
const chatbot = document.getElementById('chatbot');
const chatBody = document.getElementById('chat-body');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const toggleChat = document.getElementById('toggle-chat');

toggleChat.addEventListener('click', () => {
    chatbot.style.display = chatbot.style.display === 'none' ? 'flex' : 'none';
});

sendBtn.addEventListener('click', async () => {
    const userMessage = userInput.value;
    if (!userMessage) return;

    appendMessage('User', userMessage);
    userInput.value = '';

    const response = await getChatbotResponse(userMessage);
    appendMessage('Chatbot', response);
});

async function getChatbotResponse(message) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo', // Use the correct model for chat
                messages: [{ role: 'user', content: message }], // Format for chat API
                max_tokens: 60, // Adjust for response length
            }),
        });

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Log the entire response for debugging
        console.log('API Response:', data);

        // Check if choices exist and have at least one element
        if (data.choices && data.choices.length > 0) {
            const result = data.choices[0].message.content.trim(); // Access the content correctly
            return limitWords(result, 30); // Limit to 30 words
        } else {
            throw new Error('No choices returned from OpenAI API');
        }
    } catch (error) {
        console.error('Error fetching response from OpenAI:', error);
        return 'Sorry, I could not process your request. Please try again later.';
    }
}

function limitWords(text, wordLimit) {
    return text.split(' ').slice(0, wordLimit).join(' ');
}

function appendMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = `${sender}: ${message}`;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight; 
}