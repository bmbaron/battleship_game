import PlayerFactory from './Player.test';

const player = new PlayerFactory('man');
const computer = new PlayerFactory('computer');
const playerBoard = player.getPlayerBoard();
const computerBoard = computer.getPlayerBoard();
let gameOver = false;
let ships = {
	first: [5, 0],
	second: [4, 10],
	third: [3, 20],
	fourth: [2, 30],
	fifth: [2, 40],
	sixth: [1, 50],
	seventh: [1, 60]
};

function placeAllShips(board) {
	playerBoard.buildBoard();
	Object.values(ships).forEach(ship => {
		playerBoard.placeShip(ship[0], ship[1]);
	});
	//console.log(playerBoard.getBoard());
	return true;
}

function loop() {
	placeAllShips(playerBoard);
	placeAllShips(computerBoard);

	let playerTurn = true;
	for (let i = 0; i < 80; i += 1) {
		if(playerTurn) {
			player.move(computerBoard);
			playerTurn = false;
		}
		else {
			computer.move(playerBoard);
			playerTurn = true;
		}
	}
	console.log(playerBoard.getBoard());
	return true;
}

test('try to place one player\'s ships', () => {
  expect(placeAllShips(playerBoard)).toBe(true);
	expect(placeAllShips(computerBoard)).toBe(true);
});

test('simulate attacks and check that board is updated', () => {
  expect(loop()).toBe(true);
});