// Import necessary hooks from React
import { useState, useEffect, useRef } from 'react';

// Import CSS styles for the component
import './faltu.css';

/**
 * ChatPage component: a simple chat interface with an AI therapist.
 * 
 * @returns {JSX.Element} The chat interface.
 */
const ChatPage = () => {
  // State to store the user's chat input
  const [chatInput, setChatInput] = useState('');

  // State to store the chat messages
  const [chatMessages, setChatMessages] = useState([
    // Initial message from the AI therapist
    { text: "Hello, I'm here to listen. What's on your mind?", sender: 'ai' },
  ]);

  // Reference to the end of the chat messages container
  const chatEndRef = useRef(null);

  /**
   * Handle changes to the chat input field.
   * 
   * @param {Event} e - The input event.
   */
  const handleChatInput = (e) => {
    // Update the chat input state with the new value
    setChatInput(e.target.value);
  };

  /**
   * Handle submission of the chat form.
   * 
   * @param {Event} e - The form submission event.
   */
  const handleChatSubmit = (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Check if the chat input is not empty
    if (chatInput.trim() !== '') {
      // Create a new message object with the user's input
      const userMessage = { text: chatInput, sender: 'user', timestamp: new Date() };

      // Add the user's message to the chat messages state
      setChatMessages((prevMessages) => [...prevMessages, userMessage]);

      // Clear the chat input field
      setChatInput('');

      // Simulate a delay for the AI therapist's response
      setTimeout(() => {
        // Create a new message object with the AI therapist's response
        const aiResponse = { text: "I'm here to listen and help.", sender: 'ai', timestamp: new Date() };

        // Add the AI therapist's response to the chat messages state
        setChatMessages((prevMessages) => [...prevMessages, aiResponse]);
      }, 1000);
    }
  };

  /**
   * Effect to scroll to the bottom of the chat messages container when new messages are added.
   */
  useEffect(() => {
    // Check if the chatEndRef is not null
    if (chatEndRef.current) {
      // Log a message to the console for debugging purposes
      console.log('Scrolling to the bottom...');

      // Scroll to the bottom of the chat messages container
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]); // Re-run the effect when the chat messages state changes

  // Return the JSX element for the chat interface
  return (
    <div className="chat-area">
      <h1 className="chat-title">AI Therapist</h1>
      <hr className="divider" />
      <div className="chat-messages">
        {/*
          Map over the chat messages state and render each message as a chat bubble.
        */}
        {chatMessages.map((message, index) => (
          <div key={index} className={`chat-bubble ${message.sender}`}>
            {message.text}
            <span className="timestamp">
              {/*
                Display the timestamp for the message if it exists.
              */}
              {message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
            </span>
          </div>
        ))}
        
        {/*
          Reference to the end of the chat messages container.
        */}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleChatSubmit} className="chat-form">
        {/*
          Input field for the user to type their message.
        */}
        <input
          type="text"
          value={chatInput}
          onChange={handleChatInput}
          className="chat-input"
          placeholder="Type a message..."
          maxLength={200}
        />
        {/*
          Button to submit the chat form.
        */}
        <button type="submit" className="send">Send</button>
      </form>
    </div>
  );
};

// Export the ChatPage component
export default ChatPage;