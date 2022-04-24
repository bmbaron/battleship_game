/* eslint-disable */
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import PlayerFactory from './Player.test';
import { renderBoard, initializeBoard, initializeUI } from './domHandling';

const player = new PlayerFactory('man');
const computer = new PlayerFactory('computer');
const playerBoard = player.getPlayerBoard();
const computerBoard = computer.getPlayerBoard();
const ships = {
  first: [5, 0],
  second: [4, 10],
  third: [3, 20],
  fourth: [2, 30],
  fifth: [2, 40],
  sixth: [1, 50],
  seventh: [1, 60],
};

function placeAllShips(board) {
  board.buildBoard();
  Object.values(ships).forEach((ship) => {
    board.placeShip(ship[0], ship[1]);
  });
  return true;
}

let boardContainers = initializeUI();
const boardContainer1 = initializeBoard(boardContainers[0]);
const boardContainer2 = initializeBoard(boardContainers[1]);

boardContainer2.querySelectorAll('.btn').forEach((button) => {
	button.addEventListener("click", function() {
		player.move(computerBoard, parseInt(button.innerText));
	  renderBoard(boardContainer2, computerBoard.getBoard());
	});
});


function loop() {
  placeAllShips(playerBoard);
  placeAllShips(computerBoard);

  let playerTurn = true;
  for (let i = 0; i < 50; i += 1) {
    if (playerTurn) {
			console.log('hello');
			renderBoard(boardContainer2, computerBoard.getBoard());
      playerTurn = false;
    } else {
      computer.move(playerBoard);
			renderBoard(boardContainer1, playerBoard.getBoard());
      playerTurn = true;
    }
  }
  return true;
}

loop();





