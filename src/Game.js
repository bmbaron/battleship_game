import PlayerFactory from './Player';
import { renderBoard, initializeBoard, initializeUI } from './domHandling';

export function placeAllShips(board) {
  board.buildBoard();
  const coordinatesArray = [];

  function makeCoordinates(ship) {
    const length = ship[0];
    const horizontal = ship[1];
    const startPosition = Math.floor(Math.random() * 100);
    const shipCoords = [];
    if (horizontal) {
      for (let i = startPosition; i < startPosition + length; i += 1) {
        shipCoords.push(i);
      }
    } else {
      for (let i = 0; i < length; i += 1) {
        shipCoords.push(startPosition + (i * 10));
      }
    }
    shipCoords.forEach((potentialCoord) => {
      coordinatesArray.forEach((chosenCoord) => {
        if (chosenCoord.includes(potentialCoord)) {
          console.log(potentialCoord);
          makeCoordinates(ship);
        }
      });
    });
    coordinatesArray.push(shipCoords);
    return shipCoords;
    // return startPosition;
  }
  const ships = {
    first: [5, Math.random() < 0.5],
    second: [4, Math.random() < 0.5],
    third: [3, Math.random() < 0.5],
    fourth: [2, Math.random() < 0.5],
    fifth: [2, Math.random() < 0.5],
    sixth: [1, Math.random() < 0.5],
    seventh: [1, Math.random() < 0.5],
  };
  Object.values(ships).forEach((ship) => {
    board.placeShip(makeCoordinates(ship));
  });
  console.log(coordinatesArray);
  // board.placeShip(array);
}

export function gameLoop() {
  const player = new PlayerFactory('man');
  const computer = new PlayerFactory('computer');
  const playerBoard = player.getPlayerBoard();
  const computerBoard = computer.getPlayerBoard();

  const boardContainers = initializeUI();
  const boardContainer1 = initializeBoard(boardContainers[0]);
  const boardContainer2 = initializeBoard(boardContainers[1]);

  boardContainer2.querySelectorAll('.btn').forEach((button) => {
    button.addEventListener('click', () => {
      player.move(computerBoard, parseInt(button.innerText, 10));
      renderBoard(boardContainer2, computerBoard.getBoard());
      computer.move(playerBoard);
      renderBoard(boardContainer1, playerBoard.getBoard());
    });
  });

  placeAllShips(playerBoard);
  placeAllShips(computerBoard);
}
