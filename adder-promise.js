function adder(x, y) {
  return new Promise((resolve, reject) => {
      let answer = x + y;
      if (isNaN(answer)) {
          reject(new Error("Input needs to be a number"));
      }
      resolve(answer);
  });
}

adder(2,5)
    .then(answer1 => {
        return adder(answer1, 2);
    })
    .then(answer2 => {
        return adder(answer2, 9);
    })
    .then(answer3 => {
        console.log(answer3);
    })
    .catch(err => {
        console.log(err)
    });