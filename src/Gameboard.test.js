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

  function placeShip(length, pos) {
    for (let i = pos; i < pos + length; i += 1) {
      board[i] = 'x';
    }
    return board;
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
  board.placeShip(5, 0);
  expect(board.getBoard()[0]).toBe('x');
  expect(board.getBoard()[1]).toBe('x');
  expect(board.getBoard()[2]).toBe('x');
  expect(board.getBoard()[3]).toBe('x');
  expect(board.getBoard()[4]).toBe('x');
  expect(board.getBoard()[5]).toBe(6);
});
