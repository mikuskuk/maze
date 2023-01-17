const maze = document.querySelector('.maze');

let state = 'ready';
let position = start_position;
let moves_count = 0;

maze.style.fontSize = (16 * 4 / size) + 'px';

for (let index = 0; index < (size * size); index++) {
  const template = document.querySelector('.template.cell');
  const cell = template.cloneNode();
  // cell.textContent = index;
  cell.classList.remove('template');
  maze.append(cell);
}

maze.children[start_position].classList.add('start');
maze.children[start_position].classList.add('active');
maze.children[finish_position].classList.add('end');

for (let index = 0; index < bombs.length; index++) {
  const coord = bombs[index];
  maze.children[coord].classList.add('bomb');
}

window.onkeyup = function (event) {
  if (
    event.key != 'ArrowRight' && event.key != 'ArrowLeft' &&
    event.key != 'ArrowDown' && event.key != 'ArrowUp'
  ) return;

  makeMove(event.key);
};

document.querySelector('.reset').onclick = resetHandle;

function makeMove(direction) {
  console.log(direction);
  if (state == 'finished' || state == 'lost') return;

  maze.children[position].classList.remove('active');
  let new_position = position + getStep(direction);
  if (new_position >= 0 && new_position <= (size * size - 1)) {
    position = new_position;
  }
  maze.children[position].classList.add('active');
  countMoves();
  state = 'started';

  if (position == finish_position) {
    state = 'finished';
    displayMessage('Finish has been reached');
  }

  if (bombs.includes(position)) {
    state = 'lost';
    displayMessage('You stept on the bomb');
  }
}

function resetHandle() {
  state = 'ready';
  moves_count = 0;
  document.querySelector('.moves_count').textContent = moves_count;

  maze.children[position].classList.remove('active');
  position = start_position;
  maze.children[position].classList.add('active');

  displayMessage('');
}

function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

function countMoves() {
  document.querySelector('.moves_count').textContent = ++moves_count;
}

function getStep(key) {
  let column = position % size;
  if (key == 'ArrowRight') {
    if (column < (size - 1)) {
      return 1;
    }
  }
  else if (key == 'ArrowLeft') {
    if (column >= 1) {
      return -1;
    }
  }
  else if (key == 'ArrowDown') {
    return size;
  }
  else if (key == 'ArrowUp') {
    return -1 * size;
  }

  return 0;
}

let seconds = 0;

function displayTime() {
  setTimeout(function () {
    document.querySelector('.time').textContent = ++seconds;
    displayTime();
  }, 1000);
}

displayTime();


/*
1. * Finiša paziņojums 
2. * Minu elementu pievienošana
3. * Minas noteikšana un spēles zaudēšana
4. * Palielināt laukumu 10 x 10 (paredzēt iespējamās nākotnes laukuma izmēru maiņas)
5. Automatizēt gājienu veikšanu
6. * Statistika, jeb gāienu soļu skaitīšana
*/



