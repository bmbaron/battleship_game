import PlayerFactory from './Player';
import { renderBoard, initializeBoard, initializeUI } from './domHandling';
import { placeAllShips, eraseTakenCoordinates } from './placeShips.test';

// Object.values(ships).forEach(() => {
//   // let gotCoordinates = false;
//   // while (!gotCoordinates) {
//   // gotCoordinates = makeCoordinates(ship);
//   // }
//   // board.placeShip(makeCoordinates(ship));
// });
// console.log('coordinatesArray');

function createShips(boardContainer, board) {
  eraseTakenCoordinates();
  const shipLengths = [5, 4, 3, 2, 2, 1, 1];

  const shipArray = ['', '', '', '', '', '', ''];
  for (let i = 0; i < shipArray.length; i += 1) {
    shipArray[i] = placeAllShips(shipLengths[i]);
    if (shipArray[i][0] === false) {
      console.log('try again');
      shipArray[i] = placeAllShips(shipLengths[i]);
    }
    console.log(shipArray[i]);
    board.placeShip(shipArray[i][1]);
  }
  renderBoard(boardContainer, board.getBoard());
  console.log(board.getBoard());
}

export default function gameLoop() {
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

  playerBoard.buildBoard();
  createShips(boardContainer1, playerBoard);
  computerBoard.buildBoard();
  createShips(boardContainer2, computerBoard);
}
