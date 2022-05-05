/* eslint-disable */

const board = [
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
		10, 11, 12, 13, 'x', 15, 16, 17, 18, 19, 
		20, 21, 22, 23, 'x', 25, 26, 27, 28, 29, 
		30, 31, 32, 33, 'x', 35, 36, 37, 38, 39, 
		40, 41, 'x', 43, 'x', 45, 46, 'x', 'x', 'x', 
		50, 51, 52, 53, 'x', 55, 56, 57, 58, 59, 
		60, 61, 62, 'x', 64, 65, 66, 67, 'x', 'x', 
		70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 
		80, 81, 82, 83, 'x', 85, 'x', 'x', 'x', 'x', 
		90, 91, 92, 93, 'x', 95, 96, 97, 98, 99
];

let lastHits = [];
let direction = undefined;

function getDirection(lastMove, moveBeforeLast) {
	if (lastMove - moveBeforeLast === 1) {
		return 'right';
	}
	else if (lastMove - moveBeforeLast === -1) {
		return 'left';
	}
	else if (lastMove - moveBeforeLast === 10) {
		return 'down';
	}
	else if (lastMove - moveBeforeLast === -10) {
		return 'up';
	}
	else {
		return undefined;
	}
}

function reverseDirection(direction) {
	if (direction === 'right') {
		return 'left';
	}
	else if (direction === 'left') {
		return 'right';
	}
	else if (direction === 'up') {
		return 'down';
	}
	else if (direction === 'down') {
		return 'up';
	}
	else {
		return undefined;
	}
}

function markAsSunk() {
	for (let i = 0; i < board.length; i += 1) {
		if(board[i] === '!') {
			board[i] = 's';
		}
	}
	console.log(board);
}

function testFunction(board, num) {
	let move = Math.floor(Math.random() * 99);
	if (num !== undefined) {
		move = num; //Math.floor(Math.random() * 99);
	}
	let lastHit = lastHits.slice(-1)[0];
	if (board[lastHit] === 's') {
		console.log('sunk');
		lastHit = undefined;
		lastHits = [];
		direction = undefined;
		move = Math.floor(Math.random() * 99);
	}
	if (lastHit !== undefined && direction === undefined) {
			if (lastHit + 1 < 100 && board[lastHit + 1] !== '!' && board[lastHit + 1] !== 'm') {
				move = lastHit + 1;
			}
			else if (lastHit - 1 > 0 && board[lastHit - 1] !== '!' && board[lastHit - 1] !== 'm') {
				move = lastHit - 1;
			}
			else if (lastHit + 10 < 100 && board[lastHit + 10] !== '!' && board[lastHit + 10] !== 'm') {
				move = lastHit + 10;
			}
			else if (lastHit - 10 > 0 && board[lastHit - 10] !== '!' && board[lastHit - 10] !== 'm') {
				move = lastHit - 10;
			}
			console.log('found after hit: ' + move, direction);
	}
	else if (lastHit !== undefined && direction !== undefined) {
		if (direction === 'right' && lastHit + 1 < 100) {
			move = lastHit + 1;
		}
		else if (direction === 'left' && lastHit - 1 > -1) {
			move = lastHit - 1;
		}
		else if (direction === 'down' && lastHit + 10 < 100) {
			move = lastHit + 10;
		}
		else if (direction === 'up' && lastHit - 10 > -1) {
			move = lastHit - 10;
		}			
		console.log(move, direction);
	}
	if(lastHit - move !== 1 && lastHit - move !== 10 && move - lastHit !== 1 && move - lastHit !== 10) {
		lastHit = undefined;
	}

	if (board[move] === 'x') {
		board[move] = '!';
		lastHits.push(move);
		if (lastHit === undefined && direction === undefined) {
			console.log('first hit: ' + move, direction);
		}
		else if (lastHit !== undefined && direction === undefined) {
			direction = getDirection(move, lastHit);
			console.log('third hit: ' + move, direction);
		}
	} 
	else {
		if (direction !== undefined) {
			direction = reverseDirection();
			while (lastHits.length > 1) {
				lastHits.pop();
			}
		}
		console.log('miss');
		board[move] = 'm';
		console.log(move);
	}
	// markAsSunk();
	return move;
}

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

// test('the function can return a move', () => {
// 	expect(testFunction()).toEqual(13);
// });

test('the function can register a miss', () => {
	// testFunction(board, 0);
});

test('the function can register a hit', () => {
	lastHits = [];
	// testFunction(board, 24);
});

test('the function can register a hit and then find a spot next to it', () => {
	lastHits = [];
	testFunction(board, );
	testFunction(board, );
	testFunction(board, );
	testFunction(board, );
	testFunction(board, );
	testFunction(board, );
	testFunction(board, );
	testFunction(board, );
	testFunction(board, );
	// console.log(board);
});
