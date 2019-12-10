const util = require('util');
const setImmediatePromise = util.promisify(setImmediate);

setImmediatePromise('foobar').then((value) => {
  // value === 'foobar' (passing values is optional)
  // This is executed after all I/O callbacks.
  setTimeout(() => {
    console.log(value)
  }, 2000)
  setTimeout(() => {
    console.log('bfdf')
  }, 4000)
});

(function () {
  con
})()