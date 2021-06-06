'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  // your code here
  let solutionArray = solution.split(''); // split solution string into array
  let guessArray = guess.split(''); // split input guess string into array
  let letterCorrect = 0; // initialize correct letters counter
  let letterLocation = 0; // initialize correct position counter
  
  // get count for correct locations
  guessArray.forEach((element, index) => {
    // tests if the guessed leter matches the solution location
    if (element === solutionArray[index]) {
      letterLocation++; // add one to counter for correct letter location
      // sets correct guess and solution arrays to null 
      solutionArray[index] = null;
      guessArray[index] = null;
    }
  });
  
  // get letter count 
  guessArray.forEach((element, index) => {
    // loop through arrary adding up nulls
    if (element === null) {
      if (solutionArray.indexOf(element) > -1) {
        letterCorrect++;
        guessArray[index] = null; 
        solutionArray[solutionArray.indexOf(element)] = null;
      }
    }
  });
  
  // console.log(letterCorrect.toString() + " - " + letterLocation.toString());
  return letterCorrect.toString() + "-" + letterLocation.toString();
}

const mastermind = (guess) => {
  solution = 'abcd'; // Comment this out to generate a random solution
  // your code here
  if (solution == guess) { // compare guess to solution to find immediate win
    console.log("🟢 🟢  You Win");
    board = []; // reset board
    generateSolution();
    return "🟢 🟢  You Win";
  } else { // everything else we invoke generateHint  
    let hint = generateHint(guess);
    board.push(guess + " " + hint); // pushes the guess and hints to single array

    if (board.length > 10) { // checks number of items in array > 10
      console.log("⚫️ ⚫️  Out of Turns"); // >10 trys returns out of turns
      board = [];
      return "⚫️ ⚫️  Out of Turns";

    } else {
      return "Please guess again"
    }
  }
}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), '🟢 🟢  You Win');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}