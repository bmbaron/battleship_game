import GameboardFactory from './Gameboard';

test('check if new board is an object', () => {
  const board = new GameboardFactory();
  expect(typeof board).toBe('object');
});

test('build a board with positions from 1 to 100', () => {
  const board = new GameboardFactory();
  board.buildBoard();
  expect(board.getBoard().length).toBe(100);
});

test('place a ship on the board with the starting position and length of ship stated', () => {
  const board = new GameboardFactory();
  board.buildBoard();
  const ship = board.placeShip(3, 0);
  expect(ship.getCoordinates().length).toEqual(3);
  expect(ship.getCoordinates()).toEqual([0, 1, 2]);
});

test('check if an attack that misses is marked as a miss', () => {
  const board = new GameboardFactory();
  board.buildBoard();
  board.placeShip(3, 0);
  expect(board.receiveAttack(27)).toBe(false);
});

test('check if a placed ships can be attacked until sunk', () => {
  const board = new GameboardFactory();
  board.buildBoard();
  board.placeShip(3, 0);
  expect(board.receiveAttack(0)).toBe(true);
  expect(board.receiveAttack(1)).toBe(true);
  expect(board.receiveAttack(2)).toBe(true);
  expect(board.checkIfAllSunk()).toBe(true);
});

test('isAlreadyHit is working', () => {
  const board = new GameboardFactory();
  board.buildBoard();
  board.placeShip(3, 0);
  expect(board.receiveAttack(2)).toBe(true);
  expect(board.isAlreadyHit(2)).toBe(true);
});
