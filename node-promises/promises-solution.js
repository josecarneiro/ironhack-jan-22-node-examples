const fs = require('fs');

fs.promises
  .readFile('a.txt', 'utf-8')
  .then((textOfA) => {
    console.log('Text of a.txt: ' + textOfA);
    return fs.promises.readFile('b.txt', 'utf-8');
  })
  .then((textOfB) => {
    console.log('Text of b.txt: ' + textOfB);
    return fs.promises.readFile('e.txt', 'utf-8');
  })
  .then((textOfC) => {
    console.log('Text of c.txt: ' + textOfC);
  })
  .catch((error) => {
    console.log('Couldnt read file in promise method.', error);
  });

/*
promiseA
  .then(() => {
    return promiseB;
  })
  .then(() => { // Here we're calling .then on promiseB

  })
*/
