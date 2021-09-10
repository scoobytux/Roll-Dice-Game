'use strict';

const diceImg = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModal = document.querySelector('.close-modal');

const players = document.querySelectorAll('.player');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let currentPlayer, currentScore, randNum, isPlaying;
const totalScores = [0, 0];

initGame();
function chooseFirstPlayer(player) {
  if (isPlaying || currentScore) return;
  currentPlayer = player;
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add('player--active');
  isPlaying = true;
}
//--------------------------------------------------------------------------------------------------------
players[0].addEventListener('click', () => {
  chooseFirstPlayer(0);
});
players[1].addEventListener('click', () => {
  chooseFirstPlayer(1);
});

btnRoll.addEventListener('click', () => {
  if (!isPlaying) return;

  // Generate random number from 1 - 6
  randNum = Math.trunc(Math.random() * 6) + 1;

  diceImg.src = `dice-${randNum}.png`;
  diceImg.classList.remove('hidden');

  if (randNum != 1) {
    currentScore += randNum;
    document.querySelector('#current--' + currentPlayer).textContent =
      currentScore;
    return;
  }

  // Switch player when randNum == 1
  switchPlayer();
});

btnHold.addEventListener('click', () => {
  if (!isPlaying) return;

  totalScores[currentPlayer] += currentScore;
  document.querySelector(`#score--${currentPlayer}`).textContent =
    totalScores[currentPlayer];

  if (totalScores[currentPlayer] >= 50) {
    isPlaying = false;

    diceImg.classList.add('hidden');
    document.querySelector(`#current--${currentPlayer}`).textContent =
      'YOU WIN 🏆';

    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.remove('player--active');

    return;
  }

  // Switch player when pressing Hold button
  switchPlayer();
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

// Start another game
btnNew.addEventListener('click', initGame);

//--------------------------------------------------------------------------------------------------------
function initGame() {
  isPlaying = false;
  totalScores[0] = totalScores[1] = 0;
  currentScore = 0;

  diceImg.classList.add('hidden');

  player0.classList.remove('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');

  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
  document.querySelector('#score--1').textContent = 0;
}

function switchPlayer() {
  currentScore = 0;
  document.querySelector(`#current--${currentPlayer}`).textContent = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

function closeWindow() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}
