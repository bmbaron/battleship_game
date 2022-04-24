import GameboardFactory from './Gameboard.test';

function PlayerFactory(name) {
  const data = {
    name,
    shipsSunk: 0,
  };

  function getPlayerBoard() {
    const playerBoard = new GameboardFactory();
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
    getPlayerBoard,
    move,
  };
}

export default PlayerFactory;

// test('make a new player', () => {
//   const player = new PlayerFactory();
//   expect(typeof player).toBe('object');
// });

// test('make a new player with a name and check the name', () => {
//   const player = new PlayerFactory('computer');
//   expect(player.data.name).toEqual('computer');
// });

// test('make a new player and board and have player attack the board', () => {
//   const player = new PlayerFactory('computer');
//   const board = new GameboardFactory();
//   board.buildBoard();
//   board.placeShip(3, 0);
//   player.move(board);
// });
