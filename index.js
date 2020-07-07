const topLeft = document.querySelector('.top-left');
const topRight = document.querySelector('.top-right');
const bottomLeft = document.querySelector('.bottom-left');
const bottomRight = document.querySelector('.bottom-right');

const getRandomPanel = () => {
  const panels = [
    topLeft,
    topRight,
    bottomLeft,
    bottomRight
  ];
  return panels[parseInt(Math.random() * panels.length)];
};

const sequence = [getRandomPanel()];
let sequenceToGuess = [...sequence]; //clone
console.log(sequenceToGuess);

const flash = panel => {
  return new Promise(resolve => {
    panel.className += ' active'; //turn it white when clicked
    setTimeout(() => {
      panel.className = panel.className.replace(' active', ''); 
      setTimeout(() => {
        resolve();
      }, 250); //get rid of the active state in 250 mili sec
    }, 1000);
  });
};

let canClick = false;

const panelClicked = panelClicked => {
  if (!canClick) return; //return from the callback preventing player to click when still flashing
  const expectedPanel = sequenceToGuess.shift();
  console.log(expectedPanel);
  if (expectedPanel === panelClicked) {
    if (sequenceToGuess.length === 0) {
      // start new round
      sequence.push(getRandomPanel());
      sequenceToGuess = [...sequence];
      startFlashing();
    }
  } else {
    // end game
    alert('game over');
  }
};

const startFlashing = async () => {
  canClick = false;
  for (const panel of sequence) {
    await flash(panel); //prevent flashing on the same time
  }
  canClick = true;
};

startFlashing();