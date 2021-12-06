const engine = {
  colors: ['green', 'purple', 'pink', 'yellow', 'red', 'blue', 'white', 'black', 'gray'],
  hex: {
    green: '#008000',
    purple: '#800080',
    pink: '#FFC0CB',
    yellow: '#FFFF00',
    red: '#FF0000',
    blue: '#0000FF',
    white: '#FFFFFF',
    black: '#000000',
    gray: '#808080',
  },
  coins: 0,
};

const coinAudio = new Audio('sounds/moeda.mp3');
const mistakeAudio = new Audio('sounds/errou.mp3');

const recorderBtn = document.getElementById('answer-btn');
let audioTranscript = '';

function changeImage() {
  const windowWidth = window.innerWidth;
  const main = document.getElementById('body');
  const imageArea = document.getElementById('mario');
  
  if (windowWidth >= '768') {
    if (!imageArea) {
      const newImageArea = document.createElement('section');

      main.appendChild(newImageArea);
      newImageArea.id = 'mario';
      newImageArea.innerHTML = "<img src='./images/mario.png' alt='mario'>";
    }
  } else {
    main.removeChild(imageArea);
  }
}

function drawColor() {
  const colorsLength = engine.colors.length;
  const colorIndex = Math.floor(Math.random() * colorsLength);
  const colorNameArea = document.getElementById('color-name');
  
  colorNameArea.innerText = engine.colors[colorIndex];

  return engine.hex[engine.colors[colorIndex]];
}

function addColorToBox(color) {
  const colorBox = document.getElementById('current-color');

  colorBox.style.backgroundColor = color;
}

function updateScore(value) {
  let score = document.getElementById('current-score');

  engine.coins += value;

  if (value > 0) coinAudio.play();
  if (value < 0) mistakeAudio.play();

  score.innerText = engine.coins;
}

if (window.SpeechRecognition || window.webkitSpeechRecognition) {
  const SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recorder = new SpeechAPI();

  recorder.continuos = false;
  recorder.lang = 'en-US';

  recorder.onstart = function() {
    recorderBtn.innerText = 'I\'m listening';
    recorderBtn.style.backgroundColor = 'white';
    recorderBtn.style.color = 'black';
  }

  recorder.onend = function() {
    recorderBtn.innerText = 'ANSWER';
    recorderBtn.style.backgroundColor = 'transparent';
    recorderBtn.style.color = 'white';
  }

  recorder.onresult = function(e) {
    const colorName = document.getElementById('color-name').innerText.toLowerCase();
    audioTranscript = e.results[0][0].transcript;

    if (colorName === audioTranscript.toLowerCase()) {
      updateScore(1);
    } else {
      updateScore(-1);
    }

    addColorToBox(drawColor());
  }

  recorderBtn.addEventListener('click', function(e) {
    recorder.start();
  });
} else {
  alert('There is no support for speech recognition. I\'m sorry :(');
}

window.addEventListener('resize', changeImage);
window.onload(changeImage());
window.onload(addColorToBox(drawColor()));