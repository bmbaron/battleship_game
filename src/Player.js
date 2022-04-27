import GameboardFactory from './Gameboard';

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
      const posToAttack = Math.floor(Math.random() * 100);
      if (!board.isAlreadyHit(posToAttack) && enemyBoard[posToAttack] !== 'm') {
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
