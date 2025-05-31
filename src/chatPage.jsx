import { useState, useEffect, useRef } from 'react';
import './faltu.css';

const ChatPage = () => {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { text: "Hello, I'm here to listen. What's on your mind?", sender: 'ai' },
  ]);
  const [chatEnded, setChatEnded] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const chatEndRef = useRef(null);

  const handleChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();

    if (chatInput.trim() !== '') {
      if (chatEnded && chatInput.trim().toLowerCase() === 'restart') {
        setChatMessages([
          { text: "Hello, I'm here to listen. What's on your mind?", sender: 'ai' }
        ]);
        setChatEnded(false);
        setChatInput('');
        return;
      }

      if (chatInput.trim().toLowerCase() === 'exit') {
        const userMessage = { text: chatInput, sender: 'user', timestamp: new Date() };
        const exitMessage = {
          text: "Chat session has ended. You can now generate your therapy report.",
          sender: 'ai',
          timestamp: new Date()
        };

        setChatMessages((prevMessages) => [...prevMessages, userMessage, exitMessage]);
        setChatInput('');
        setChatEnded(true);
        return;
      }

      if (!chatEnded) {
        const userMessage = { text: chatInput, sender: 'user', timestamp: new Date() };
        setChatMessages((prevMessages) => [...prevMessages, userMessage]);
        setChatInput('');

        try {
          const response = await fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: chatInput }),
          });

          const data = await response.json();

          if (response.ok) {
            const aiMessage = { text: data.ai_response, sender: 'ai', timestamp: new Date() };
            setChatMessages((prevMessages) => [...prevMessages, aiMessage]);
          } else {
            console.error("API Error:", data.error);
            const errorMessage = { text: "Error: Unable to fetch response.", sender: 'ai', timestamp: new Date() };
            setChatMessages((prevMessages) => [...prevMessages, errorMessage]);
          }
        } catch (error) {
          console.error("Network error:", error);
          const errorMessage = { text: "Error: Unable to connect to the server.", sender: 'ai', timestamp: new Date() };
          setChatMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
      } else {
        setChatInput('');
        setChatMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Chat has ended. Type 'restart' to begin a new session or use the Generate Report button.",
            sender: 'ai',
            timestamp: new Date()
          }
        ]);
      }
    }
  };

  const handleGenerateReport = async () => {
    if (isGeneratingReport) return;

    setIsGeneratingReport(true);

    const loadingMessage = {
      text: "Generating your therapy report...",
      sender: 'ai',
      timestamp: new Date()
    };

    setChatMessages((prevMessages) => [...prevMessages, loadingMessage]);

    try {
      const response = await fetch('http://127.0.0.1:5000/generate_report');
      const data = await response.json();

      if (response.ok) {
        setChatMessages((prevMessages) =>
          prevMessages.filter(msg => msg !== loadingMessage)
        );

        const reportMessage = {
          text: "Therapy report generated.",
          sender: 'ai',
          timestamp: new Date(),
          reportImage: data.report_image_url,
          reportDownloadUrl: data.report_text_url
        };

        setChatMessages((prevMessages) => [...prevMessages, reportMessage]);
      } else {
        console.error("API Error:", data.error);
        setChatMessages((prevMessages) =>
          prevMessages.map(msg =>
            msg === loadingMessage
              ? {
                text: "Error: Unable to generate report.",
                sender: 'ai',
                timestamp: new Date()
              }
              : msg
          )
        );
      }
    } catch (error) {
      console.error("Network error:", error);
      setChatMessages((prevMessages) =>
        prevMessages.map(msg =>
          msg === loadingMessage
            ? {
              text: "Error: Unable to connect to the server.",
              sender: 'ai',
              timestamp: new Date()
            }
            : msg
        )
      );
    } finally {
      setIsGeneratingReport(false);
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  return (
    <div className="chat-area">
      <div className="chat-header">
        <h1 className="chat-title">AI Therapist</h1>
        <button className="home-button" onClick={() => window.location.href = '/homePage.jsx'}>Home</button>
      </div>
      {chatEnded ? (
        <button
          onClick={handleGenerateReport}
          className={`report-btn ${isGeneratingReport ? 'disabled' : ''}`}
          disabled={isGeneratingReport}
        >
          {isGeneratingReport ? 'Generating...' : 'Generate Therapy Report'}
        </button>
      ) : (
        <button disabled className="report-btn disabled">
          Generate Therapy Report
        </button>
      )}

      <hr className="divider" />

      <div className="chat-messages">
        {chatMessages.map((message, index) => (
          <div key={index} className={`chat-bubble ${message.sender}`}>
            {message.text}
            {message.reportDownloadUrl && (
              <div className="download-container" style={{ marginTop: '10px' }}>
                <a
                  href="http://127.0.0.1:5000/therapy_report.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-link"
                  style={{ backgroundColor: '#FF9800', marginRight: '10px' }}
                >
                  View Text Report
                </a>
                <a
                  href="http://127.0.0.1:5000/download_therapy_report.txt"
                  download="therapy_report.txt"
                  className="download-link"
                  style={{ backgroundColor: '#2196F3', marginRight: '10px' }}
                >
                  Download Text Report
                </a>
              </div>
            )}

            {message.reportImage && (
              <div className="download-container" style={{ marginTop: '10px' }}>
                <a
                  href={`http://127.0.0.1:5000${message.reportImage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-link"
                  style={{ backgroundColor: '#4CAF50', marginRight: '10px' }}
                >
                  View Image Report
                </a>
                <a
                  href={`http://127.0.0.1:5000${message.reportImage}?download=true`}
                  download="sentiment_report.png"
                  className="download-link"
                  style={{ backgroundColor: '#673AB7' }}
                >
                  Download Image Report
                </a>
              </div>
            )}

            <span className="timestamp">
              {message.timestamp
                ? new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : ''}
            </span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleChatSubmit} className="chat-form">
        <input
          type="text"
          value={chatInput}
          onChange={handleChatInput}
          className="chat-input"
          placeholder={chatEnded ? "Type 'restart' to begin again..." : "Type a message or 'exit' to end..."}
          maxLength={200}
        />
        <button type="submit" className="send">Send</button>
      </form>
    </div>
  );
};

export default ChatPage;