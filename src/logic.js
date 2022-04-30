/* eslint-disable */

let lastMoves = [];
let lastHit = false;
let foundShip = false;
let direction = '';


export default function testFunction(board) {
	let move = Math.floor(Math.random() * 99);
	let lastMove = lastMoves.slice(-1)[0];

	if (board[lastMove] === 's') {
		lastHit = false;
		foundShip = false;
		lastMoves = [];
		direction = '';
		console.log('SUNK');
		move = Math.floor(Math.random() * 99);
	}

	else if (lastHit && direction === '') {
		foundShip = true;
		if (lastMove + 1 < 100 && typeof board[lastMove + 1] === 'number') {
			move = lastMove + 1;
		}
		else if (lastMove - 1 > -1 && typeof board[lastMove - 1] === 'number') {
			move = lastMove - 1;
		}
		else if (lastMove + 10 < 100 && typeof board[lastMove + 10] === 'number') {
			move = lastMove + 10;
		}
		else if (lastMove - 10 > -1 && typeof board[lastMove - 10] === 'number') {
			move = lastMove - 10;
		}
	}
	if (lastHit && direction !== '') {
		if (direction === 'right' && lastMove + 1 < 100 && typeof board[lastMove + 1] === 'number') {
			move = lastMove + 1;
		}
		if (direction === 'left' && lastMove - 1 > -1 && typeof board[lastMove - 1] === 'number') {
			move = lastMove - 1;
		}
		if (direction === 'down' && lastMove + 10 < 100 && typeof board[lastMove + 10] === 'number') {
			move = lastMove + 10;
		}
		if (direction === 'up' && lastMove - 10 > -1 && typeof board[lastMove - 10] === 'number') {
			move = lastMove -10;
		}			
	}
	if (!lastHit && foundShip) {
		if (lastMove + 1 < 100 && typeof board[lastMove + 1] === 'number') {
			move = lastMove + 1;
		}
		else if (lastMove - 1 > -1 && typeof board[lastMove - 1] === 'number') {
			move = lastMove - 1;
		}
		else if (lastMove + 10 < 100 && typeof board[lastMove + 10] === 'number') {
			move = lastMove + 10;
		}
		else if (lastMove - 10 > -1 && typeof board[lastMove - 10] === 'number') {
			move = lastMove - 10;
		}
		if (direction === 'right' && lastMove + 1 < 100 && typeof board[lastMove + 1] === 'number') {
			move = lastMove + 1;
			return move;
		}
		if (direction === 'left' && lastMove - 1 > -1 && typeof board[lastMove - 1] === 'number') {
			move = lastMove - 1;
			return move;
		}
		if (direction === 'down' && lastMove + 10 < 100 && typeof board[lastMove + 10] === 'number') {
			move = lastMove + 10;
			return move;
		}
		if (direction === 'up' && lastMove - 10 > -1 && typeof board[lastMove - 10] === 'number') {
			move = lastMove -10;
			return move;
		}	
		else {
			lastMoves.pop();
			if (direction === 'right') {
				direction = 'left';
			}
			else if (direction === 'left') {
				direction = 'right';
			}
			else if (direction === 'up') {
				direction = 'down';
			}
			else if (direction === 'down') {
				direction = 'up';
			}
		}
	}

  if (board[move] === 'x') {
		lastMoves.push(move);
		if (lastMove - lastMoves.slice(-2)[0] === 1) {
			direction = 'right';
		}
		else if (lastMove - lastMoves.slice(-2)[0] === -1) {
			direction = 'left';
		}
		else if (lastMove - lastMoves.slice(-2)[0] === 10) {
			direction = 'down';
		}
		else if (lastMove - lastMoves.slice(-2)[0] === -10) {
			direction = 'up';
		}
		lastHit = true;
  }
	else if (typeof board[move] === 'number') {
		lastHit = false;
	}
	console.log('  move: ' + move + ' lastMove: ' + lastMove + ' direction: ' + direction)
  return move;
}