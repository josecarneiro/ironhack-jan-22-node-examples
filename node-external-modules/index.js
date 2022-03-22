// require('./foo.js');
// require('./bar/foo.js');
// require('./../foo.js');
// require('./../node-introduction/subtract.js');
// require('../node-introduction/subtract');

// Native node modules
// File System
// fs
// We can import the fs module
// by writing:
const fs = require('fs');
// We pass the name of the native node module
// to require()
// Node knows where these native modules are installed
// and it will require the contents of the correct files

const contents = fs.readFileSync('book.txt', 'utf-8');

/*
fs.readFile('book.txt', 'utf-8', (error, contents) => {
  console.log(error);
  console.log(data);
});
fs.promises.readFile('book.txt', 'utf-8').then(() => {})
*/

console.log(contents);

// npm
// Node package manager
// Publicly accessible repository for third-party packages
// Anyone can publish to npm and anyone can install a package from npm

// const isNumber = require('./node_modules/is-number/index.js');
// const isNumber = require('./node_modules/is-number');
// If we're referencing a third party module
// we can pass require() the name of the module alone
const isNumber = require('is-number');

console.log(isNumber(10));
console.log(isNumber('hello'));
