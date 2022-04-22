import Ship from './ship.test';

function Gameboard() {
  const board = [];

  function getBoard() {
    return board;
  }

  function buildBoard() {
    for (let i = 1; i <= 100; i += 1) {
      board[i - 1] = i;
    }
    return board;
  }

  function checkPlace(length, pos) {
    if (Math.floor(pos % 10) >= 6 || Math.floor(pos % 10) === 0) {
      return 0;
    }
    return 1;
  }

  function placeShip(length, pos) {
    if (checkPlace(length, pos) !== 0) {
      const coordinatesArray = [];
      const ship = new Ship();
      for (let i = pos; i < pos + length; i += 1) {
        board[i] = 'x';
        coordinatesArray.push(i);
      }
      ship.setCoordinates(coordinatesArray);
      return ship;
    }
    return false;
  }

  return {
    getBoard,
    buildBoard,
    placeShip,
  };
}

export default Gameboard;

test('check if new board is an object', () => {
  const board = new Gameboard();
  expect(typeof board).toBe('object');
});

test('build a board with positions from 1 to 100', () => {
  const board = new Gameboard();
  expect(board.buildBoard().length).toBe(100);
});

test('the last element of the board array has a value of 100', () => {
  const board = new Gameboard();
  expect(board.buildBoard()[99]).toBe(100);
});

test('a ship placed at 1 with a length of 5 will change the board', () => {
  const board = new Gameboard();
  board.buildBoard();
  board.placeShip(5, 1);
  expect(board.getBoard()[1]).toBe('x');
  expect(board.getBoard()[2]).toBe('x');
  expect(board.getBoard()[3]).toBe('x');
  expect(board.getBoard()[4]).toBe('x');
  expect(board.getBoard()[5]).toBe('x');
  expect(board.getBoard()[6]).toBe(7);
  expect(board.getBoard()[92]).toBe(93);
});

test('a ship placed at 6 and 17 and 28 and 40 will not be placed', () => {
  const board = new Gameboard();
  board.buildBoard();
  expect(board.placeShip(5, 6)).toBe(false);
  expect(board.placeShip(5, 17)).toBe(false);
  expect(board.placeShip(5, 28)).toBe(false);
  expect(board.placeShip(5, 40)).toBe(false);
});

test('building a ships coordinates from placeShips function', () => {
  const board = new Gameboard();
  board.buildBoard();
  const ship = board.placeShip(2, 2);
  expect(ship.getCoordinates()).toEqual([2, 3]);
});

test('place a ship then mark it as hit', () => {
  const board = new Gameboard();
  board.buildBoard();
  const ship = board.placeShip(2, 2);
  ship.hit(2);
  expect(ship.hitSpots[0]).toBe(2);
});
