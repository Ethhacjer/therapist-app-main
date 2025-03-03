import './App.css';
import { Route, Routes } from 'react-router-dom'; // ❌ Removed BrowserRouter here
import HomePage from './homePage';
import ChatPage from './chatPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
};

export default App;
