// Callback is simply a function we pass to another function
// that will be called at a later point in time
// once a certain asynchronous operation has been completed

// Synchronous code
const a = 1;
const b = 2;
let c = a + b;
console.log(c);
c = a + b + 10;
console.log(c);

// Asynchronous code
// Race condition
// We're just not sure which asynchronous operation will be executed first

// Callback hell
// The pyramid of doom
setTimeout(() => {
  console.log('AAA');
  setTimeout(() => {
    console.log('BBB');
    setTimeout(() => {
      console.log('CCC');
      setTimeout(() => {
        console.log('DDD');
        setTimeout(() => {
          console.log('EEE');
        }, 3);
      }, 3);
    }, 3);
  }, 2);
}, 1000);
