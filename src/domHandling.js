export function initializeUI() {
  const mainContainer = document.querySelector('.main-container');

  const container1 = document.createElement('div');
  container1.classList.add('container');
  container1.id = 'container1';
  const container2 = document.createElement('div');
  container2.classList.add('container');
  container2.id = 'container2';

  const leftContainer = document.createElement('div');
  leftContainer.classList.add('left-container');
  leftContainer.id = 'left-container';

  const rightContainer = document.createElement('div');
  rightContainer.classList.add('right-container');
  rightContainer.id = 'right-container';

  const boardContainer1 = document.createElement('div');
  boardContainer1.classList.add('board-container', 'disabled');
  boardContainer1.id = 'board-container1';

  const boardContainer2 = document.createElement('div');
  boardContainer2.classList.add('board-container');
  boardContainer2.id = 'board-container2';

  const playerLabel1 = document.createElement('div');
  playerLabel1.classList.add('player-label');
  playerLabel1.id = 'player-label';
  playerLabel1.innerText = 'your board (click to shuffle)';
  playerLabel1.onclick = (() => {
    window.location.reload();
  });

  const playerLabel2 = document.createElement('div');
  playerLabel2.classList.add('player-label', 'disabled');
  playerLabel2.innerText = 'computer\'s board (attack any position)';
  playerLabel2.id = 'computer-label';

  leftContainer.appendChild(playerLabel1);
  leftContainer.appendChild(boardContainer1);
  container1.appendChild(leftContainer);

  rightContainer.appendChild(playerLabel2);
  rightContainer.appendChild(boardContainer2);
  container2.appendChild(rightContainer);

  mainContainer.appendChild(container1);
  mainContainer.appendChild(container2);
  return [boardContainer1, boardContainer2];
}

export function initializeBoard(boardContainer) {
  for (let i = 0; i < 100; i += 1) {
    const square = document.createElement('button');
    square.classList.add('btn', 'btn-outline-primary', 'rounded-0');
    square.id = i;
    // square.innerText = i;
    boardContainer.appendChild(square);
  }
  return boardContainer;
}

export function renderBoard(boardContainer, board) {
  boardContainer.querySelectorAll('.btn').forEach((square) => {
    if (Number.isNaN(Number(board[square.id]))) {
      if (board[square.id] === 'x' && boardContainer.id !== 'board-container2') {
        square.classList.add('btn-ship');
      }
      if (board[square.id] === 'm') {
        square.classList.add('btn-miss');
      }
      if (board[square.id] === '!') {
        square.classList.add('btn-hit');
      }
      if (board[square.id] === 's') {
        square.classList.add('btn-sunk');
      }
    }
  });
}

export async function sunkStatus(name, message, numSunk) {
  const numLeft = 7 - numSunk;
  if (numSunk === 1) {
    const pLabel = document.getElementById('player-label');
    pLabel.classList.add('disabled');
    pLabel.innerText = '';
  }
  if (name === 'player') {
    document.getElementById('player-label').innerText = `Your ${message} was sunk!`;
  } else if (name === 'computer') {
    document.getElementById('computer-label').innerText = `${message} sunk! ${numLeft} left`;
  }
  if (numLeft === 0) {
    const winner = (name === 'player') ? 'computer' : 'player';
    const pLabel = document.getElementById('player-label');
    pLabel.innerText = 'play again';
    pLabel.classList.remove('disabled');
    pLabel.classList.add('play-again');
    document.getElementById('computer-label').innerText = `${winner} is the winner!`;
    document.getElementById('board-container2').classList.add('disabled');
  }
}
