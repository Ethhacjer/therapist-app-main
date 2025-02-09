import { useState } from 'react';

const App = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { text: 'Hello, I\'m here to listen. What\'s on your mind?', sender: 'ai' },
  ]);

  const handleChatToggle = () => {
    setChatOpen(!chatOpen);
  };

  const handleChatInput = (e) => {
    if (e.target) {
      setChatInput(e.target.value);
    }
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatInput.trim() !== '') {
      setChatMessages((prevMessages) => [...prevMessages, { text: chatInput, sender: 'user' }]);
      setChatInput('');
      setTimeout(() => {
        setChatMessages((prevMessages) => [...prevMessages, { text: 'I\'m here to listen and help.', sender: 'ai' }]);
      }, 1000);
    }
  };

  return (
    <div className="bg-gray-100 h-screen w-screen flex flex-col items-center justify-center">
      <header className="bg-white w-full py-4 shadow-md">
        <nav className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-lg font-bold text-gray-800">AI Therapist</a>
          <ul className="flex items-center space-x-4">
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">Chat Now</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">Therapy Sessions</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">Mental Health Resources</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">User Testimonials</a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="container mx-auto p-4 flex-1 flex flex-col items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Welcome to AI Therapist</h2>
          <p className="text-gray-600 mb-4">I'm here to listen and help. What's on your mind?</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleChatToggle}
          >
            Chat Now
          </button>
          {chatOpen && (
            <div className="mt-4">
              <form onSubmit={handleChatSubmit}>
                <input
                  type="text"
                  value={chatInput}
                  onChange={handleChatInput}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Type a message..."
                  maxLength={200}
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Send
                </button>
              </form>
              <ul className="mt-4 space-y-2">
                {chatMessages.map((message, index) => (
                  <li key={index} className={`text-gray-600 ${message.sender === 'ai' ? 'text-right' : 'text-left'}`}>
                    {message.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
      <footer className="bg-white w-full py-4 shadow-md">
        <p className="text-gray-600 text-center">&copy; 2023 AI Therapist</p>
      </footer>
    </div>
  );
};

export default App;