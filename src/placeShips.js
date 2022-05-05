import { renderBoard } from './domHandling';

let takenCoordinates = [];

function eraseTakenCoordinates() {
  takenCoordinates = [];
}

function findShipPlace(shipLength) {
  const length = shipLength;
  const horizontal = Math.random() < 0.5;
  const startPosition = Math.floor(Math.random() * 99);
  const shipCoords = [];
  if (horizontal) {
    let reverseAmount = 1;
    for (let i = startPosition; i < startPosition + length; i += 1) {
      if (Math.floor((i) % 10) === 0 || reverseAmount > 1) {
        shipCoords.push(startPosition - reverseAmount);
        reverseAmount += 1;
      } else if (reverseAmount === 1) {
        shipCoords.push(i);
      }
    }
  } else {
    let reverseAmount = 10;
    for (let i = 0; i < length; i += 1) {
      if (startPosition + (i * 10) < 100) {
        shipCoords.push(startPosition + (i * 10));
      } else {
        shipCoords.push(startPosition - reverseAmount);
        reverseAmount += 10;
      }
    }
  }

  let badPosition;
  let shipApproved = false;
  if (takenCoordinates[0] !== undefined) {
    badPosition = takenCoordinates.some((c) => shipCoords.includes(c));
    if (!badPosition) {
      shipApproved = true;
    }
  } else {
    shipApproved = true;
  }

  if (shipApproved) {
    shipCoords.forEach((coord) => {
      if (!takenCoordinates.includes(coord)) takenCoordinates.push(coord);
      if (!takenCoordinates.includes(coord + 1)) takenCoordinates.push(coord + 1);
      if (!takenCoordinates.includes(coord - 1)) takenCoordinates.push(coord - 1);
      if (!takenCoordinates.includes(coord + 10)) takenCoordinates.push(coord + 10);
      if (!takenCoordinates.includes(coord - 10)) takenCoordinates.push(coord - 10);
    });
  }
  return [shipApproved, shipCoords];
}

export default function placeShips(boardContainer, board) {
  eraseTakenCoordinates();
  const shipLengths = [5, 4, 3, 2, 2, 1, 1];

  const shipArray = ['', '', '', '', '', '', ''];
  for (let i = 0; i < shipArray.length; i += 1) {
    shipArray[i] = findShipPlace(shipLengths[i]);
    if (shipArray[i][0] === true && !shipArray[i][1].some((num) => num < 0)) {
      board.placeShip(shipArray[i][1]);
    } else {
      i -= 1;
    }
  }
  // board.getShips().forEach((s) => console.log(s.getCoordinates()));
  renderBoard(boardContainer, board.getBoard());
}
