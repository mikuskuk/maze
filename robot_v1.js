

// for (let index = 0; index < 8; index++) {
//   makeMove('ArrowDown');
// }

// for (let index = 0; index < 5; index++) {
//   makeMove('ArrowRight');
// }

// makeMove('ArrowUp');

// for (let index = 0; index < 2; index++) {
//   makeMove('ArrowRight');
// }

// for (let index = 0; index < 2; index++) {
//   makeMove('ArrowDown');
// }

// makeMove('ArrowLeft');


const keys = [
  'ArrowUp', // 0
  'ArrowRight', // 1
  'ArrowDown', // 2
  'ArrowLeft' // 3
];

const diffs = [
  -size,
  1,
  size,
  -1
];

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

let directions = [];

let path_position = [];
const dead_ends = [];


generate_path: {
  let position = start_position;
  path_position.push(position);

  for (let index = 0; index < 1500; index++) iterate_moves: {
    let count_fails = 0;
    for (let diff = 0; diff < 4; diff++) {
      let valid_direction = checkDirection(position, diff);
      if (valid_direction === true) {
        directions.push([1, diff]);
        position += diffs[diff];
        path_position.push(position);
        break;
      }
      else if (valid_direction === 'finish') {
        break iterate_moves;
      }
      else {
        count_fails++;
      }
    }

    if (count_fails == 4) {
      dead_ends.push(position);
      let last_move = directions[directions.length - 1];
      let new_move = (last_move[1] > 1) ? (last_move[1] - 2) : (last_move[1] + 2);

      directions.push([1, new_move])

      let new_position = position + diffs[new_move];

      path_position = [new_position];
      position = new_position;
    }
  }

  console.log(directions);


  //Aiziet uz sarakano laukumu
  //Ja trajektorija neeksistē, tad vispār neveikt soļus.
  //1. Pārbaudīt laukumus apkārt fināla šunai.
  //2. saprast kurā virzienā iet un kur atrodamies.
  //3. iet tur kur nav mīnas.
}

/**
 * Return true if we can move that way, else return false
 */
function checkDirection (position, diff) {
  let column = position % size;
  let row = (position - column) / size;


  if (row == 0 && diff == UP) return false;
  if (column == 9 && diff == RIGHT) return false;
  if (row == 9 && diff == DOWN) return false;
  if (column == 0 && diff == LEFT) return false;

  const new_position = position + diffs[diff];
  if (bombs.indexOf(new_position) != -1) return false;
  if (path_position.indexOf(new_position) != -1) return false;
  if (dead_ends.indexOf(new_position) != -1) return false;

  if (position == finish_position) return 'finish';
  
  return true;
}


/**
 * 
 * 1. Saprast uzdevumu.
 * 2. Idejs un jautājumi.
 * 3. Uzdevuma sadalīšana mazākos uzdevumos.
 */

let current_instruction_nr = 0;
let current_move_nr = 0;


if (directions.length > 0) {
  goToDirection();
}

/**
 * After specified time calls action of the game.
 */
function goToDirection () {
  // moves.length = 12;
  setTimeout(
    function () {
      const instruction = directions[current_instruction_nr];
      const steps = instruction[0];
      const func = makeMove;
      const argument = keys[instruction[1]];

      // func() == makeMove()
      // argument == 'ArrowDown'
      // func(argument) == makeMove('ArrowDown')
      
      func(argument);

      current_move_nr++;
      if (current_move_nr >= steps) {
        current_instruction_nr++;
        current_move_nr = 0;

        if (current_instruction_nr >= directions.length) return;
      }

      goToDirection();
    },
    100
  );
}





/*
  1. Nodrošināt lai gājiens atkārtojas tik reizes cik to nosaka mainīgais "steps"
    - jānoska kuras koda rindas vai rinda ir jāatkārto
    - kā uzrakstīt for ciklu.


 3. Trajektorijas noteikšana un izpildīšana, pēc iepriekš nodefinētām sākuma, beigu un mīnu pozīcijām.
*/

