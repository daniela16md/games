import React, { useState } from 'react';
import SnakeGame from '../components/Snake/snakeGame';
import TicTacToe from '../components/tic tac toe/Tictactoe';
import MemoryGame from '../components/Memory/Memory';
import Modal from '../components/Modal/Modal';

function Home({ language }) {
  const [isSnakeModalOpen, setIsSnakeModalOpen] = useState(false);
  const [isTicTacToeModalOpen, setIsTicTacToeModalOpen] = useState(false);
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);

  const openSnakeModal = () => setIsSnakeModalOpen(true);
  const closeSnakeModal = () => setIsSnakeModalOpen(false);

  const openTicTacToeModal = () => setIsTicTacToeModalOpen(true);
  const closeTicTacToeModal = () => setIsTicTacToeModalOpen(false);

  const openMemoryModal = () => setIsMemoryModalOpen(true);
  const closeMemoryModal = () => setIsMemoryModalOpen(false);

  // Texte en fonction de la langue
  const texts = {
    en: {
      welcome: 'Welcome!',
      snakeGame: 'Play Snake',
      ticTacToeGame: 'Play Tic Tac Toe',
      memoryGame: 'Play Memory',
    },
    fr: {
      welcome: 'Bienvenue !',
      snakeGame: 'Jouer au Snake',
      ticTacToeGame: 'Jouer au Tic Tac Toe',
      memoryGame: 'Jouer au Memory',
    },
  };

  return (
    <div>
     <h1 style={styles.welcomeText}>{texts[language].welcome}</h1>

      <div style={styles.buttonContainer}>
        <button onClick={openSnakeModal} style={styles.button}>
          {texts[language].snakeGame}
        </button>
        <Modal isOpen={isSnakeModalOpen} onClose={closeSnakeModal}>
          <SnakeGame />
        </Modal>

        <button onClick={openTicTacToeModal} style={styles.button}>
          {texts[language].ticTacToeGame}
        </button>
        <Modal isOpen={isTicTacToeModalOpen} onClose={closeTicTacToeModal}>
          <TicTacToe />
        </Modal>

        <button onClick={openMemoryModal} style={styles.button}>
          {texts[language].memoryGame}
        </button>
        <Modal isOpen={isMemoryModalOpen} onClose={closeMemoryModal}>
          <MemoryGame />
        </Modal>
      </div>
    </div>
  );
}

const styles = {
  welcomeText: {
    fontSize: '2rem',
    textAlign: 'center',
    color: '#333',
    marginLeft: '20px', 
    marginTop: '40px', 
  },
  buttonContainer: {
    display: 'flex',
    justifycontent: "center",
    flexDirection: 'column',
    gap: '40px',
    marginTop: '15%',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '20px 30px',
    fontSize: '24px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '30%',
    alignSelf: 'center',
    borderRadius: '45%',
  },
};

export default Home;
