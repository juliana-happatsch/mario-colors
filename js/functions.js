const engine = {
  colors: ['green', 'purple', 'pink', 'yellow', 'red', 'blue', 'white', 'black', 'grey'],
  hex: {
    green: '#008000',
    purple: '#800080',
    pink: '#FFC0CB',
    yellow: '#FFFF00',
    red: '#FF0000',
    blue: '#0000FF',
    white: '#FFFFFF',
    black: '#000000',
    grey: '#808080',
  },
  coins: 0,
};

const coinAudio = new Audio('sounds/moeda.mp3');
const mistakeAudio = new Audio('sounds/errou.mp3');

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

addColorToBox(drawColor());