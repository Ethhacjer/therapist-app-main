import { Link } from 'react-router-dom';
import './faltu.css';

const HomePage = () => {
  return (
    <div>
      <header className="header">
        <nav className="navigation">
          <div className="logo">
            <a href="#" className="AI therapist">AI Therapist</a>
          </div>
          <div className="nav-links">
            <Link to="/chat">Chat Now</Link>
            <a href="#">Therapy Sessions</a>
            <a href="#">Mental Health Resources</a>
            <a href="#">User Testimonials</a>
          </div>
        </nav>
      </header>
      <main className="main">
        <div>
          <h2 className="hero">Welcome to AI Therapist</h2>
          <p className="subtext">I'm here to listen and help. What's on your mind?</p>
          <Link to="/chat">
            <button className="chat-now">Chat Now</button>
          </Link>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2023 AI Therapist</p>
      </footer>
    </div>
  );
};

export default HomePage;
