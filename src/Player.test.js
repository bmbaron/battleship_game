import PlayerFactory from './Player';
import GameboardFactory from './Gameboard';

test('make a new player', () => {
  const player = new PlayerFactory();
  expect(typeof player).toBe('object');
});

test('make a new player with a name and check the name', () => {
  const player = new PlayerFactory('computer');
  expect(player.data.name).toEqual('computer');
});

test('make a new player and board and have player attack the board', () => {
  const player = new PlayerFactory('computer');
  const board = new GameboardFactory();
  board.buildBoard();
  board.placeShip(3, 0);
  player.move(board);
});
