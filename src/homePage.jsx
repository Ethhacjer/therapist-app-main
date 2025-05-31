import { Link } from 'react-router-dom';
import './faltu.css';
// import meditatingImg from './assets/front-view-young-woman-meditating-home.jpg';
// import teamImg from './assets/60111.jpg';

const HomePage = () => {
  return (
    <div>
      <header className="header">
        <nav className="navigation">
          <div className="logo">
            <a href="#" className="AI-therapist">AI Therapist</a>
          </div>
          <div className="nav-links">
            <Link to="/chat">Chat Now</Link>
            <a href="#">Therapy Sessions</a>
            <a href="#">Mental Health Resources</a>
            <a href="#">User Testimonials</a>
          </div>
        </nav>
      </header>
      <body>
      <div className="section-container">
        {/* Section 1 */}
        <div className="section1">
          <h1 className="hero">
            Healthy Minds, Happy Lives <span>Mental Health Companion.</span>
          </h1>
          <p className="subtext">
            Welcome to MindMate, your haven for mental wellness. Explore resources, find support, <br />
            and connect with a community dedicated to your well-being.
          </p>
          <Link to="/chat">
            <button className="chat-now">Chat Now</button>
          </Link>
          <div className="img1">
            <img src="" alt="Meditating woman" />
          </div>
        </div>

        {/* Section 2 */}
        <div className="section2">
          <h2>Why our <span>Mental Health Consultants</span> are the Best Choice</h2>
          <div className="boxes">
            <div className="box">
              <img
                alt="Illustration of a chat with an expert"
                className="image"
                height="100"
                src=""
                width="100"
              />
              <h3 className="text-xl font-bold">Chat with Expert</h3>
              <p>Connect with our experts for personalized advice and support.</p>
            </div>
            <div className="box2">
              <img
                alt="Illustration of anonymous identity"
                className="image"
                height="100"
                src=""
                width="100"
              />
              <h3>Anonymous Identity</h3>
              <p>Your privacy is our priority. Get support while staying anonymous.</p>
            </div>
            <div className="box">
              <img
                alt="Illustration of visiting hospitals"
                className="image"
                height="100"
                src=""
                width="100"
              />
              <h3>Visit Hospitals</h3>
              <p>Access our network of hospitals for in-person consultations.</p>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="section3">
          <h2>About Us</h2>
          <div className="imgtext">
            <div className="img2">
              <img src="" alt="Illustration of a team member" />
            </div>
            <div className="text">
              <h3>
                Discover the Faces Behind Our <span>Mental Health Consultancy</span>
              </h3>
              <p>
                Meet our compassionate team of professionals. We're here to help you
                thrive as we support you on your journey to mental wellness.
              </p>
              <button className="explore">Explore Experts</button>
            </div>
          </div>
        </div>
      </div>
      </body>
      <footer className="footer">
        <p>&copy; 2023 AI Therapist</p>
      </footer>
    </div>
  );
};

export default HomePage;
