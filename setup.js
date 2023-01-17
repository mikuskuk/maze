const size = 10;
let coords = [];

let start_position,
    finish_position,
    bombs;

if (
  localStorage.getItem('start_position') != null &&
  localStorage.getItem('finish_position') != null &&
  localStorage.getItem('bombs') != null
) {
  start_position = Number(localStorage.getItem('start_position'));
  finish_position = Number(localStorage.getItem('finish_position'));
  bombs = JSON.parse(localStorage.getItem('bombs'));
}
else {
  newMapHandle();
}


document.querySelector('.new_map').onclick = function () {
  newMapHandle();
  location.reload();
};

function newMapHandle () {
  coords = [];
  for (let index = 0; index < (size * size); index++) {
    coords.push(index);
  }
  start_position = getRandomPosition();
  finish_position = getRandomPosition();
  bombs = [];

  for (let index = 0; index < Math.floor(size * size * 0.2); index++) {
    bombs.push(getRandomPosition());
  }

  localStorage.setItem('start_position', start_position);
  localStorage.setItem('finish_position', finish_position);
  localStorage.setItem('bombs', JSON.stringify(bombs));
}

function getRandomPosition() {
  const index = Math.floor(Math.random() * coords.length);
  const rand_number = coords[index];
  coords.splice(index, 1);

  return rand_number;
}
