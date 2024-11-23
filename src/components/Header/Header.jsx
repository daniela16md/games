// src/components/Header/Header.js
import React, { useState, useEffect } from 'react';

function Header({ language, toggleLanguage }) {  // Récupère language et toggleLanguage en props
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = '#121212';  
      document.body.style.color = '#fff';  
    } else {
      document.body.style.backgroundColor = '#fff'; 
      document.body.style.color = '#000'; 
    }
  }, [darkMode]);

  const texts = {
    en: {
      logo: 'DM',
      darkModeButton: darkMode ? '🌙' : '☀️',
      languageButton: 'FR',
    },
    fr: {
      logo: 'DM',
      darkModeButton: darkMode ? '🌙' : '☀️',
      languageButton: 'EN',
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.logoWrapper}>
        <h1 style={styles.logo}>{texts[language].logo}</h1> 
      </div>
      <nav style={styles.nav}>
        <button onClick={toggleDarkMode} style={styles.darkModeButton}>
          {texts[language].darkModeButton} 
        </button>
        <button onClick={toggleLanguage} style={styles.languageButton}>
          {texts[language].languageButton} 
        </button>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#222',
    color: '#fff',
  },
  logoWrapper: {
    flex: 1,
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    margin: 0,
  },
  nav: {
    flex: 2,
    textAlign: 'right',
  },
  darkModeButton: {
    backgroundColor: '#555',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '10px',  
  },
  languageButton: {
    backgroundColor: '#555',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Header;
