const generator = function* (end) {
  for (let i = 0; i < end; i += 1) {
    yield i;
  }
}

const forLoop = (end) => {
  for (let i = 0; i < end; i += 1) {
    console.log(i);
  }
}

const forOf = (end) => {
  for (const value of generator(end)) {
    console.log(value)
  }
}

const forIn = (end) => {
    for(const value in [...generator(end)]) {
      console.log(value);
    }
}

const forEach = (end) => {
  [...generator(end)].forEach(value => {
    console.log(value)
  })
}

const whileLoop = (end) => {
  let i = 0;
  while (i < end) {
    console.log(i);
    i += 1;
  }
}

const doWhile = (end) => {
  let i = 0;

  do {
    console.log(i)
    i += 1
  } while (i < end)
}

const doWhileGenerator = (end) => {
  const range = generator(end);
  let value = range.next();
  do {
    console.log(value.value)
    value = range.next();
  } while(!value.done)
}


const whileGenerator = (end) => {
  const range = generator(end);
  let value = range.next();
  while(!value.done){
    console.log(value.value)
    value = range.next();
  } 
}

function forLoopRacer (maxCountingNumber) {
  var startTime = Date.now();
  // your loop stuff goes here 
  forEach(maxCountingNumber)
  var finishTime = Date.now();
  var functionDuration = (finishTime - startTime) / 1000; // convert from milliseconds to seconds with "/1000"
  console.log(`The for loop function took ${functionDuration} seconds to run.`);
}
forLoopRacer(1000);