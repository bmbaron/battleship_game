import placeShips from './placeShips';
import PlayerFactory from './Player';

test('place 7 ships at different coordinates', () => {
  const player = new PlayerFactory('man');
  const playerBoard = player.getPlayerBoard();
  const shipLengths = [5, 4, 3, 2, 2, 1, 1];
  if (placeShips(playerBoard, shipLengths[0])[0] === false) {
    console.log('no duplicate');
  }
  if (placeShips(playerBoard, shipLengths[1])[0] === false) {
    console.log('no duplicate');
  }
  if (placeShips(playerBoard, shipLengths[2])[0] === false) {
    console.log('no duplicate');
  }
  if (placeShips(playerBoard, shipLengths[3])[0] === false) {
    console.log('no duplicate');
  }
  if (placeShips(playerBoard, shipLengths[4])[0] === false) {
    console.log('no duplicate');
  }
  if (placeShips(playerBoard, shipLengths[5])[0] === false) {
    console.log('no duplicate');
  }
  if (placeShips(playerBoard, shipLengths[6])[0] === false) {
    console.log('no duplicate');
  }
  expect(placeShips(playerBoard, shipLengths[0])).toBe(false);
  expect(placeShips(playerBoard, shipLengths[1])).toBe(false);
  expect(placeShips(playerBoard, shipLengths[2])).toBe(false);
  expect(placeShips(playerBoard, shipLengths[3])).toBe(false);
  expect(placeShips(playerBoard, shipLengths[4])).toBe(false);
  expect(placeShips(playerBoard, shipLengths[5])).toBe(false);
  expect(placeShips(playerBoard, shipLengths[6])).toBe(false);
});
