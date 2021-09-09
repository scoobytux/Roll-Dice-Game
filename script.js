'use strict';

const diceImg = document.querySelector('.dice'),
  btnRoll = document.querySelector('.btn--roll'),
  btnHold = document.querySelector('.btn--hold'),
  modal = document.querySelector('.modal'),
  overlay = document.querySelector('.overlay'),
  closeModal = document.querySelector('.close-modal');

let playerXCurScore = undefined,
  playerXFinalScore = undefined;

let player0 = document.querySelector('.player--0'),
  player1 = document.querySelector('.player--1');

let currentPlayer = 0; // Player 1 plays first
let randNum = undefined;

//--------------------------------------------------------------------------------------------------------
btnRoll.addEventListener('click', () => {
  let randNum = Math.trunc(Math.random() * 6) + 1;

  // @Keyword: Immediately-Invoked Function Expression (IIFE)
  // https://stackoverflow.com/questions/8228281/what-is-the-function-construct-in-javascript
  // Just to test the IIFE feature
  (function (randNum) {
    diceImg.src = `dice-${randNum}.png`;
  })(randNum);

  if (diceImg.classList.contains('hidden')) diceImg.classList.remove('hidden');

  playerXCurScore = document.querySelector('#current--' + currentPlayer);
  if (randNum != 1) {
    playerXCurScore.textContent = Number(playerXCurScore.textContent) + randNum;
    return;
  }

  // Switch player when randNum == 1
  switchPlayer(currentPlayer);
});

btnHold.addEventListener('click', () => {
  playerXFinalScore = document.querySelector('#score--' + currentPlayer);
  playerXFinalScore.textContent =
    Number(playerXFinalScore.textContent) + Number(playerXCurScore.textContent);

  // Switch player when pressing Hold button
  switchPlayer(currentPlayer);
});

document.addEventListener('keydown', event => {
  if (event.key === 'p') {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  }
});

// Close modal window handler
closeModal.addEventListener('click', closeWindow);
overlay.addEventListener('click', closeWindow);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeWindow();
});

//--------------------------------------------------------------------------------------------------------
function switchPlayer(curPlayer) {
  playerXCurScore.textContent = 0;
  currentPlayer = curPlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

function closeWindow() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}
