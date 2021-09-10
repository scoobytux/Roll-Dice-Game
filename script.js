'use strict';

const diceImg = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModal = document.querySelector('.close-modal');
const btnNew = document.querySelector('.btn--new');

let playerXCurScore = undefined,
  playerXFinalScore = undefined;

let player0 = document.querySelector('.player--0'),
  player1 = document.querySelector('.player--1');

let currentPlayer = 0; // Player 1 plays first
let randNum = undefined;
let isPlaying = true;
//--------------------------------------------------------------------------------------------------------
btnRoll.addEventListener('click', () => {
  if (!isPlaying) return;

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
  if (!isPlaying) return;

  playerXFinalScore = document.querySelector('#score--' + currentPlayer);
  playerXFinalScore.textContent =
    Number(playerXFinalScore.textContent) + Number(playerXCurScore.textContent);

  if (Number(playerXFinalScore.textContent) >= 50) {
    isPlaying = false;

    diceImg.classList.add('hidden');
    playerXCurScore.textContent = 'YOU WIN 🏆';

    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.remove('player--active');
    return;
  }

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

// Reset the game
btnNew.addEventListener('click', () => {
  currentPlayer = 0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');

  diceImg.classList.add('hidden');

  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
  document.querySelector('#score--1').textContent = 0;

  isPlaying = true;
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
