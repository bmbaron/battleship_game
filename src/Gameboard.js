/* eslint-disable consistent-return */
import ShipFactory from './Ship';

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
        if (ship.getHitSpots()[index] === true) {
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
          }
          if (ship.isSunk()) {
            ship.getCoordinates().forEach((coord) => {
              board[coord] = 's';
            });
            sunkArray.push(ship.getCoordinates().length);
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
