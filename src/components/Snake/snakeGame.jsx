import React, { useState, useEffect, useRef } from 'react';

const GRID_SIZE = 10;
const INITIAL_SNAKE = [{ x: 2, y: 2 }];
const INITIAL_DIRECTION = 'RIGHT';

const generateFood = () => {
  const x = Math.floor(Math.random() * GRID_SIZE);
  const y = Math.floor(Math.random() * GRID_SIZE);
  return { x, y };
};

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(generateFood());
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(300); 
  const [isPaused, setIsPaused] = useState(false); 
  const gameInterval = useRef(null);

  const gridWidth = GRID_SIZE * 30; 

  useEffect(() => {
    if (gameOver || isPaused) return;

    clearInterval(gameInterval.current);
    gameInterval.current = setInterval(moveSnake, speed);

    return () => clearInterval(gameInterval.current);
  }, [snake, direction, gameOver, speed, isPaused]); 

  const moveSnake = () => {
    if (gameOver || isPaused) return; 

    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
      default:
        break;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setFood(generateFood());
      setScore(score + 1);
    } else {
      newSnake.pop();
    }

    if (checkCollision(newSnake)) {
      setGameOver(true);
      clearInterval(gameInterval.current);
    } else {
      setSnake(newSnake);
    }
  };

  const checkCollision = (snake) => {
    const head = snake[0];
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }
    return false;
  };

  const handleKeyDown = (e) => {
    if (gameOver || isPaused) return;

    if (e.key === 'ArrowUp' && direction !== 'DOWN') {
      setDirection('UP');
    } else if (e.key === 'ArrowDown' && direction !== 'UP') {
      setDirection('DOWN');
    } else if (e.key === 'ArrowLeft' && direction !== 'RIGHT') {
      setDirection('LEFT');
    } else if (e.key === 'ArrowRight' && direction !== 'LEFT') {
      setDirection('RIGHT');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction, gameOver, isPaused]);

  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood());
    setGameOver(false);
    setScore(0);
    setIsPaused(false); 
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev); 
  };

  const handleSpeedChange = (event) => {
    const newSpeed = parseInt(event.target.value, 10);
    setSpeed(newSpeed);
  };

  return (
    <div>
      <h2>Jeu Snake</h2>
      <div style={styles.gameArea}>
        <div style={styles.grid}>
          {Array.from({ length: GRID_SIZE }).map((_, row) =>
            Array.from({ length: GRID_SIZE }).map((_, col) => {
              const isSnake = snake.some((s) => s.x === col && s.y === row);
              const isFood = food.x === col && food.y === row;
              return (
                <div
                  key={`${row}-${col}`}
                  style={{
                    ...styles.cell,
                    backgroundColor: isSnake ? 'green' : isFood ? 'red' : 'lightgrey',
                  }}
                />
              );
            })
          )}
        </div>
      </div>

      {/* Affichage du score */}
      {!gameOver && <p>Score : {score}</p>}

      {/* Barre de vitesse (Range Slider) */}
      <div>
        <label htmlFor="speed-slider">Vitesse: {speed} ms</label>
        <input
          type="range"
          id="speed-slider"
          min="100"
          max="500"
          value={speed}
          onChange={handleSpeedChange}
          disabled={isPaused} 
          style={{ ...styles.slider, width: gridWidth }} 
        />
      </div>

      {/* Boutons Pause / Reprendre */}
      <div>
        <button onClick={togglePause} style={styles.button}>
          {isPaused ? 'Reprendre' : 'Pause'}
        </button>
      </div>

      {/* Game Over - Affichage du score final et bouton recommencer */}
      {gameOver && (
        <div style={styles.restartContainer}>
          <div style={styles.scoreFinal}>
            <p>Score final : {score}</p>
          </div>
          <button onClick={restartGame} style={styles.restartButton}>Recommencer</button>
        </div>
      )}
    </div>
  );
};

// Style
const styles = {
  gameArea: {
    width: '300px',
    height: '300px',
    margin: '0 auto',
    position: 'relative',
    border: '2px solid #000',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: `repeat(${GRID_SIZE}, 30px)`,
    gridTemplateRows: `repeat(${GRID_SIZE}, 30px)`,
  },
  cell: {
    width: '30px',
    height: '30px',
    boxSizing: 'border-box',
  },
  slider: {
    margin: '10px 0',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  restartContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, 
  },
  scoreFinal: {
    marginBottom: '20px',
    fontSize: '20px',
    color: '#333',
  },
  restartButton: {
    backgroundColor: '#ff5733',
    color: '#fff',
    padding: '15px 25px',
    fontSize: '18px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
  },
};

export default SnakeGame;
