import PlayerFactory from './Player';
import { renderBoard, initializeBoard, initializeUI } from './domHandling';

export function placeAllShips(board) {
  const ships = {
    first: [5, 0],
    second: [4, 10],
    third: [3, 20],
    fourth: [2, 30],
    fifth: [2, 40],
    sixth: [1, 50],
    seventh: [1, 60],
  };
  board.buildBoard();
  Object.values(ships).forEach((ship) => {
    board.placeShip(ship[0], ship[1]);
  });
  return true;
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
