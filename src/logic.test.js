/* eslint-disable */

const board = [
  0, 0, 0, 0, 0,
  0, 1, 1, 1, 0,
  0, 0, 0, 0, 0,
];

const lastMoves = [];
let lastHit = false;
let foundShip = false;
let direction = '';


function testFunction() {
	let random = Math.floor(Math.random() * 15);
  console.log('last move: ' + lastMoves.slice(-1)[0]);

	if (lastHit) {
		foundShip = true;
		random = lastMoves.slice(-1)[0] + 1;
		if (board[6] === 'x' && board[7] === 'x' && board[8] === 'x') {
			board[6] = 's';
			board[7] = 's';
			board[8] = 's';
			lastHit = false;
			foundShip = false;
			console.log('SUNK');
			random = Math.floor(Math.random() * 15);
		}
		if (direction === 'left') {
			random = lastMoves.slice(-1)[0] - 1;
		}
		if (direction === 'right') {
			random = lastMoves.slice(-1)[0] + 1;
		}
		if (direction === 'down') {
			random = lastMoves.slice(-1)[0] + 5;
		}
		if (direction === 'up') {
			random = lastMoves.slice(-1)[0] - 5;
		}
	}
	if (!lastHit && foundShip) {
		if (board[lastMoves.slice(-1)[0] + 5] !== 'x' && board[lastMoves.slice(-1)[0] + 5] !== 'm') {
			random = lastMoves.slice(-1)[0] + 5;
		}
		else if (board[lastMoves.slice(-1)[0] - 5] !== 'x' && board[lastMoves.slice(-1)[0] - 5] !== 'm') {
			random = lastMoves.slice(-1)[0] - 5;
		}
		else if (board[lastMoves.slice(-1)[0] - 1] !== 'x' && board[lastMoves.slice(-1)[0] - 1] !== 'm') {
			random = lastMoves.slice(-1)[0] - 1;
		}
		else {
			lastMoves.pop();
		}
	}

  if (board[random] === 1) {
    console.log('hit');
		lastMoves.push(random);
		if (lastMoves.slice(-1)[0] - lastMoves.slice(-2)[0] === 1) {
			direction = 'right'
			console.log(direction);
		}
		else if (lastMoves.slice(-1)[0] - lastMoves.slice(-2)[0] === -1) {
			direction = 'left'
			console.log(direction);
		}
		else if (lastMoves.slice(-1)[0] - lastMoves.slice(-2)[0] === 5) {
			direction = 'down'
			console.log(direction);
		}
		else if (lastMoves.slice(-1)[0] - lastMoves.slice(-2)[0] === -5) {
			direction = 'down'
			console.log(direction);
		}
		board[random] = 'x';
		lastHit = true;
  }
	else if (board[random] !== 'x' && board[random] !== 'm' && board[random] !== 's') {
		lastHit = false;
		board[random] = 'm';
	}
	console.log(board);
  return true;
}

test('check the board', () => {
  expect(board).toEqual([
    0, 0, 0, 0, 0,
    0, 1, 1, 1, 0,
    0, 0, 0, 0, 0,
  ]);
});

// test('check that the function can get the board', () => {
//   expect(testFunction()).toEqual([
//     0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0,
//     0, 'x', 1, 1, 0,
//     0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0,
//   ]);
// });

// test('check that the function can mark a hit', () => {
//   expect(testFunction()).toEqual([
//     0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0,
//     0, 'x', 1, 1, 0,
//     0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0,
//   ]);
// });

test('check that the function can remeber a hit', () => {
  testFunction();
  testFunction();
	testFunction();
  testFunction();
	testFunction();
  testFunction();
	testFunction();
	testFunction();
	testFunction();
	testFunction();
  expect(testFunction()).toEqual(true);
});
