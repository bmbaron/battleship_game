/* eslint-disable consistent-return */
import ShipFactory from './Ship.test';

function GameboardFactory() {
  const board = [];
  const shipArray = [];
  const sunkArray = [];
  function getBoard() {
    return board;
  }

  function buildBoard() {
    for (let i = 0; i < 100; i += 1) {
      board[i] = i;
    }
    return board;
  }

  function placeShip(length, pos) {
    const coordinatesArray = [];
    const ship = new ShipFactory();
    for (let i = pos; i < pos + length; i += 1) {
      board[i] = 'x';
      coordinatesArray.push(i);
    }
    ship.setCoordinates(coordinatesArray);
    shipArray.push(ship);
    return ship;
  }

  function isAlreadyHit(pos) {
    let isHit = false;
    // eslint-disable-next-line array-callback-return
    shipArray.some((ship) => {
      if (ship.getCoordinates().includes(pos)) {
        const index = ship.getCoordinates().indexOf(pos);
        if (ship.getHitSpots()[index]) {
          isHit = true;
          return true;
        }
      }
    });
    if (isHit) {
      return true;
    }

    return false;
  }

  function checkIfAllSunk() {
    if (sunkArray.length === shipArray.length) {
      return true;
    }
    return false;
  }

  function receiveAttack(pos) {
    if (pos >= 0 && pos <= 99) {
      if (board[pos] === 'x') {
        shipArray.forEach((ship) => {
          if (ship.getCoordinates().includes(pos)) {
            ship.hit(pos);
            board[pos] = '!';
            if (ship.isSunk()) {
              sunkArray.push(ship.getCoordinates().length);
            }
          }
        });
        return true;
      }
      board[pos] = 'm';
    }
    return false;
  }

  return {
    getBoard,
    buildBoard,
    placeShip,
    isAlreadyHit,
    receiveAttack,
    checkIfAllSunk,
  };
}

export default GameboardFactory;

// test('check if new board is an object', () => {
//   const board = new GameboardFactory();
//   expect(typeof board).toBe('object');
// });

// test('build a board with positions from 1 to 100', () => {
//   const board = new GameboardFactory();
//   board.buildBoard();
//   expect(board.getBoard().length).toBe(100);
// });

// test('place a ship on the board with the starting position and length of ship stated', () => {
//   const board = new GameboardFactory();
//   board.buildBoard();
//   const ship = board.placeShip(3, 0);
//   expect(ship.getCoordinates().length).toEqual(3);
//   expect(ship.getCoordinates()).toEqual([0, 1, 2]);
// });

// test('check if an attack that misses is marked as a miss', () => {
//   const board = new GameboardFactory();
//   board.buildBoard();
//   board.placeShip(3, 0);
//   expect(board.receiveAttack(27)).toBe(false);
// });

// test('check if a placed ships can be attacked until sunk', () => {
//   const board = new GameboardFactory();
//   board.buildBoard();
//   board.placeShip(3, 0);
//   expect(board.receiveAttack(0)).toBe(true);
//   expect(board.receiveAttack(1)).toBe(true);
//   expect(board.receiveAttack(2)).toBe(true);
//   expect(board.checkIfAllSunk()).toBe(true);
// });

// test('isAlreadyHit is working', () => {
//   const board = new GameboardFactory();
//   board.buildBoard();
//   board.placeShip(3, 0);
//   expect(board.receiveAttack(2)).toBe(true);
//   expect(board.isAlreadyHit(2)).toBe(true);
// });
