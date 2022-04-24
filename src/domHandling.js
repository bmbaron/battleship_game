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
  playerLabel1.innerText = 'your board (click to shuffle)';
  playerLabel1.id = 'player1';
  playerLabel1.onclick = (() => {
    window.location.reload();
  });

  const playerLabel2 = document.createElement('div');
  playerLabel2.classList.add('player-label');
  playerLabel2.innerText = 'computer\'s board (attack any position)';
  playerLabel2.id = 'player1';

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
    square.innerText = i;
    boardContainer.appendChild(square);
  }
  return boardContainer;
}

export function renderBoard(boardContainer, board) {
  boardContainer.querySelectorAll('.btn').forEach((square) => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(board[square.id])) {
      if (board[square.id] === 'x') {
        square.classList.add('btn-ship');
      }
      if (board[square.id] === 'm') {
        square.classList.add('btn-miss');
      }
      if (board[square.id] === '!') {
        square.classList.add('btn-hit');
      }
    }
  });
}
