import GameboardFactory from './Gameboard';
import testFunction from './logic';

function PlayerFactory(name) {
  const data = {
    name,
  };

  function setPlayerBoard() {
    const playerBoard = new GameboardFactory(name);
    return playerBoard;
  }

  function move(board, position) {
    const enemyBoard = board.getBoard();
    if (data.name === 'computer') {
      const posToAttack = testFunction(enemyBoard); // Math.floor(Math.random() * 100);
      if (enemyBoard[posToAttack] !== 'm' && enemyBoard[posToAttack] !== '!' && enemyBoard[posToAttack] !== 's') { // !board.isAlreadyHit(posToAttack) &&
        board.receiveAttack(posToAttack);
      } else {
        move(board);
      }
    } else if (data.name !== 'computer' && !board.isAlreadyHit(position) && enemyBoard[position] !== 'm') {
      board.receiveAttack(position);
    }
  }

  return {
    data,
    setPlayerBoard,
    move,
  };
}

export default PlayerFactory;
