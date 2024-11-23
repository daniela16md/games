import React, { useState, useEffect } from 'react';

// Liste de symboles ou images à associer
const symbols = ['🍎', '🍌', '🍉', '🍇', '🍒', '🍓', '🍍', '🍊'];

function MemoryGame() {
  // Crée le tableau de cartes en double pour avoir des paires
  const generateCards = () => {
    const cards = [...symbols, ...symbols]; 
    return shuffle(cards);
  };

  // Mélange le tableau de cartes
  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState(generateCards()); // Liste des cartes mélangées
  const [flippedIndices, setFlippedIndices] = useState([]); // Indices des cartes retournées
  const [matchedCards, setMatchedCards] = useState([]); // Cartes qui ont trouvé leur paire
  const [moves, setMoves] = useState(0); // Nombre de mouvements
  const [gameOver, setGameOver] = useState(false); // Si le jeu est terminé

  // Fonction pour retourner une carte
  const flipCard = (index) => {
    if (flippedIndices.length === 2 || flippedIndices.includes(index) || gameOver) return;

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setMoves(moves + 1);
      checkMatch(newFlippedIndices);
    }
  };

  // Vérifier si les deux cartes retournées sont une paire
  const checkMatch = (newFlippedIndices) => {
    const [firstIndex, secondIndex] = newFlippedIndices;
    if (cards[firstIndex] === cards[secondIndex]) {
      setMatchedCards([...matchedCards, cards[firstIndex]]);
    }

    // Après un court délai, retourner les cartes si elles ne sont pas une paire
    setTimeout(() => {
      setFlippedIndices([]);
    }, 1000);
  };

  // Vérifier si le jeu est terminé (toutes les cartes sont appariées)
  useEffect(() => {
    if (matchedCards.length === symbols.length) {
      setGameOver(true);
    }
  }, [matchedCards]);

  return (
    <div>
      <h2 style={styles.title}>Jeu de Memory</h2>
      <p style={styles.description}>Essaie de trouver toutes les paires !</p>
      <p style={styles.moves}>Nombre de mouvements: {moves}</p>

      <div style={styles.modalWrapper}>
        <div style={styles.memoryBoard}>
          {cards.map((symbol, index) => {
            const isFlipped = flippedIndices.includes(index);
            const isMatched = matchedCards.includes(symbol);

            return (
              <div
                key={index}
                style={{
                  ...styles.card,
                  ...(isFlipped || isMatched ? styles.flipped : {}),
                }}
                onClick={() => flipCard(index)}
              >
                <div
                  style={{
                    ...styles.hidden,
                    ...(isFlipped || isMatched ? styles.hiddenFlipped : {}),
                  }}
                ></div>
                {isFlipped || isMatched ? symbol : null}
              </div>
            );
          })}
        </div>
      </div>

      {gameOver && <p style={styles.gameOver}>Félicitations, vous avez trouvé toutes les paires en {moves} mouvements !</p>}
    </div>
  );
}

// Styles en CSS-in-JS
const styles = {
  title: {
    fontSize: '2rem',
    textAlign: 'center',
    color: '#333',
  },
  description: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#555',
  },
  moves: {
    textAlign: 'center',
    fontSize: '1.1rem',
    color: '#888',
  },
  // Wrapper de la modale
  modalWrapper: {
    width: '70%',  // Largeur dynamique de la modale
    maxWidth: '700px',  // Limite la largeur de la modale à 700px
    height: '500px',  // Hauteur fixe pour la modale
    overflow: 'auto', // Permet de scroller si les cartes dépassent la taille
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',  // Fond blanc
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Ombre pour donner de la profondeur
  },
  memoryBoard: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 70px)',  // Garde la taille des cartes à 120px
    gridGap: '15px',
    justifyContent: 'center',
    marginTop: '20px',
    maxHeight: 'calc(100% - 40px)',  // Empêche les cartes de déborder de la modale
    overflow: 'auto',  // Ajoute un défilement pour la grille si nécessaire
  },
  card: {
    width: '70px',
    height: '70px',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '36px',
    borderRadius: '10px',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'transform 0.3s ease-in-out',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  flipped: {
    backgroundColor: '#ffffff',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
    transform: 'scale(1.1)', // Agrandir la carte lors du retournement
  },
  hidden: {
    width: '80px',
    height: '80px',
    backgroundColor: '#ddd', // Fond gris pour la carte cachée
    borderRadius: '10px',
    transition: 'background-color 0.3s ease',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Centrer le cube
  },
  hiddenFlipped: {
    backgroundColor: 'transparent',
  },
  gameOver: {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: '#28a745',
    marginTop: '20px',
  },
};

export default MemoryGame;
