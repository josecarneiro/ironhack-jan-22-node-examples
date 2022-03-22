console.log('Hello world');

const a = 10;

console.log(20 + a);

// The following only exist in the browser context
// not in the node context
// window.addEventListener('click', () => {});
// document
// navigator

const sum = (a, b) => {
  return a + b;
};

console.log(sum(5, 7));

// Import single value exported by subtract.js file
// and assign it to variable named subtract
// Uses CommonJS syntax
// const subtract = require('./subtract');
const subtract = require('./subtract.js');

// ESModule Syntax
// import subtract from './subtract.js';

console.log(subtract(9, 4));

// const multiply = require('./operations');

const operations = require('./operations.js');
// Returns object with properties
// multiply and divide
// respectively holding references
// to the multiply and divide functions
/*
  {
    multiply: (a, b) => {
      return a * b;
    },
    divide: (a, b) => {
      return a / b;
    }
  }
*/

console.log(operations.multiply(2, 3));

console.log(operations.divide(6, 3));

/*
require('./operations')
Node will look for
operations.js
operations/index.js
*/
