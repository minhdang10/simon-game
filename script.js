const topLeft = document.querySelector('.top-left');
const topRight = document.querySelector('.top-right');
const bottomLeft = document.querySelector('.bottom-left');
const bottomRight = document.querySelector('.bottom-right');

const randomPanel = () => {
  const panels = [topLeft, topRight, bottomLeft, bottomRight];
  return panels[parseInt(Math.random() * panels.length)];
};

const sequence = [randomPanel()];
let guess = [...sequence]; //clone
//console.log(guess);

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

let click = false;

const panelClicking = clickedPanel => {
  if (!click) return; //return from the callback preventing player to click when still flashing
  const expectedPanel = guess.shift();
  //console.log(expectedPanel);
  if (expectedPanel === clickedPanel) {
    if (guess.length === 0) {
      // New round
      sequence.push(randomPanel());
      guess = [...sequence];
      startFlashing();
    }
  } else {
    // End
    alert('Wrong guessing! You lost.');
  }
};

const startFlashing = async () => {
  click = false;
  for (const panel of sequence) {
    await flash(panel); //prevent flashing on the same time
  }
  click = true;
};

startFlashing();
