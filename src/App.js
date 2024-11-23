import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import './App.css';
import { useState } from 'react';

function App() {
  // Gérer l'état global de la langue
  const [language, setLanguage] = useState('fr');  // Langue par défaut: français

  // Fonction pour basculer entre les langues
  const toggleLanguage = () => {
    setLanguage(prevLanguage => (prevLanguage === 'en' ? 'fr' : 'en'));
  };

  return (
    <Router>
      {/* Passer l'état de la langue et la fonction de changement de langue en props */}
      <Header language={language} toggleLanguage={toggleLanguage} />
      
      <Routes> 
        <Route path="/" element={<Home language={language} />} />
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;
