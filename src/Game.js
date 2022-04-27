import PlayerFactory from './Player';
import { renderBoard, initializeBoard, initializeUI } from './domHandling';
import placeShips from './placeShips';

export default function gameLoop() {
  const player = new PlayerFactory('player');
  const computer = new PlayerFactory('computer');
  const playerBoard = player.setPlayerBoard();
  const computerBoard = computer.setPlayerBoard();

  const boardContainers = initializeUI();
  const boardContainer1 = initializeBoard(boardContainers[0]);
  const boardContainer2 = initializeBoard(boardContainers[1]);

  boardContainer2.querySelectorAll('.btn').forEach((button) => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      player.move(computerBoard, parseInt(button.id, 10));
      renderBoard(boardContainer2, computerBoard.getBoard());
      computer.move(playerBoard);
      renderBoard(boardContainer1, playerBoard.getBoard());
    });
  });

  playerBoard.buildBoard();
  placeShips(boardContainer1, playerBoard);
  computerBoard.buildBoard();
  placeShips(boardContainer2, computerBoard);
}
