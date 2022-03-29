// File system
// It allows us to read, write files, directories
const fs = require('fs');

// readFileSync method is unusable in any user facing application
// as it blocks the node process
/*
const contentOfA = fs.readFileSync('a.txt', 'utf-8');
console.log(contentOfA);
const contentOfB = fs.readFileSync('b.txt', 'utf-8');
console.log(contentOfB);
*/

// Reading files asynchronously
// with callbacks
/*
fs.readFile('a.txt', (err, data) => {
  if (err) {
    console.log('There was an error reading the file.');
  } else {
    console.log('File has been read: ' + data);
    fs.readFile('b.txt', (err, data) => {
      if (err) {
        console.log('There was an error reading the file.');
      } else {
        console.log('File has been read: ' + data);
      }
    });
  }
});
*/

/*
fs.promises.readFile('c.txt', 'utf-8')
  .then(() => {
    console.log('File has been read through the fs.promises.readFile method');
  })
  .catch(() => {
    console.log('Couldnt read file in promise method.');
  });
*/

// const readFilePromise = fs.promises.readFile('c.txt', 'utf-8');

// readFilePromise references an object that is instantiated
// by node from the Promise class

// Promise objects have a few methods,
// such as then, catch and finally
// these methods return a reference to the promise object itself
// or, if a another promise is returned by the function passed
// to any of the prior methods, that promise is returned

// Each of these methods can be called on the promise object
// and each of them takes a function
// The function passed to the then method gets executed once the promise
// has been "resolved"
// A resolved promise represents a successful asynchronous operation
// The function passed to the catch method gets executed once the promise
// has been "rejected"
// A rejected promise represents an unsuccessful asynchronous operation

// readFilePromise.then((data) => {
//   console.log('File was read, heres the content: ' + data);
// });

// readFilePromise.catch((error) => {
//   console.log('There was an error loading the file.');
// });

// We solved the problem with promises
// but replicated the "callback hell" issue
// using promises
fs.promises
  .readFile('a.txt', 'utf-8')
  .then((textOfA) => {
    console.log(
      'File has been read through the fs.promises.readFile method, ' + textOfA
    );
    fs.promises
      .readFile('b.txt', 'utf-8')
      .then((textOfB) => {
        console.log(
          'File has been read through the fs.promises.readFile method, ' +
            textOfB
        );
      })
      .catch(() => {
        console.log('Couldnt read file in promise method.');
      });
  })
  .catch(() => {
    console.log('Couldnt read file in promise method.');
  });
