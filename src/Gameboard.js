/* eslint-disable consistent-return */
import ShipFactory from './Ship';
import { sunkStatus } from './domHandling';

function GameboardFactory(name) {
  const data = {
    name,
  };
  function getName() { return data.name; }
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

  function placeShip(coordinatesArray) {
    coordinatesArray.forEach((coord) => {
      board[coord] = 'x';
    });
    const ship = new ShipFactory();
    ship.setCoordinates(coordinatesArray);
    shipArray.push(ship);
  }

  function getShips() {
    return shipArray;
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
            if (ship.isSunk()) {
              ship.getCoordinates().forEach((coord) => {
                board[coord] = 's';
              });
              sunkArray.push(ship.getCoordinates().length);
              sunkStatus(data.name, ship.getName(ship.getLength()), sunkArray.length);
              // console.log(sunkArray);
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
    getName,
    getBoard,
    buildBoard,
    placeShip,
    getShips,
    isAlreadyHit,
    receiveAttack,
    checkIfAllSunk,
  };
}

export default GameboardFactory;
