/* eslint-disable no-undef-init */
let lastHits = [];
let direction = undefined;

function getDirection(lastMove, moveBeforeLast) {
  if (lastMove - moveBeforeLast === 1) {
    return 'right';
  }
  if (lastMove - moveBeforeLast === -1) {
    return 'left';
  }
  if (lastMove - moveBeforeLast === 10) {
    return 'down';
  }
  if (lastMove - moveBeforeLast === -10) {
    return 'up';
  }

  return undefined;
}

function reverseDirection(dir) {
  if (dir === 'right') {
    return 'left';
  }
  if (dir === 'left') {
    return 'right';
  }
  if (dir === 'up') {
    return 'down';
  }
  if (dir === 'down') {
    return 'up';
  }

  return undefined;
}

export default function testFunction(board) {
  let move = Math.floor(Math.random() * 99);
  let lastHit = lastHits.slice(-1)[0];
  if (board[lastHit] === 's') {
    lastHit = undefined;
    lastHits = [];
    direction = undefined;
  }
  if (lastHit !== undefined && direction === undefined) {
    if (lastHit + 1 < 100 && board[lastHit + 1] !== '!' && board[lastHit + 1] !== 'm') {
      move = lastHit + 1;
    } else if (lastHit - 1 > -1 && board[lastHit - 1] !== '!' && board[lastHit - 1] !== 'm') {
      move = lastHit - 1;
    } else if (lastHit + 10 < 100 && board[lastHit + 10] !== '!' && board[lastHit + 10] !== 'm') {
      move = lastHit + 10;
    } else if (lastHit - 10 > -1 && board[lastHit - 10] !== '!' && board[lastHit - 10] !== 'm') {
      move = lastHit - 10;
    }
  } else if (lastHit !== undefined && direction !== undefined) {
    if (direction === 'right' && lastHit + 1 < 100) {
      move = lastHit + 1;
    } else if (direction === 'left' && lastHit - 1 > -1) {
      move = lastHit - 1;
    } else if (direction === 'down' && lastHit + 10 < 100) {
      move = lastHit + 10;
    } else if (direction === 'up' && lastHit - 10 > -1) {
      move = lastHit - 10;
    }
  }
  // eslint-disable-next-line max-len
  if (lastHit - move !== 1 && lastHit - move !== 10 && move - lastHit !== 1 && move - lastHit !== 10) {
    lastHit = undefined;
  }

  if (board[move] === 'x') {
    lastHits.push(move);
    if (lastHit !== undefined && direction === undefined) {
      direction = getDirection(move, lastHit);
    }
  } else if (direction !== undefined) {
    direction = reverseDirection();
    while (lastHits.length > 1) {
      lastHits.pop();
    }
  }
  return move;
}
