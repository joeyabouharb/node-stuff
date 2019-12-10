const findProductSumsFor = (num) => {
  const numbers = [2, 3, 4, 5, 6, 7, 8, 9];
  const prime = [1, 2, 3, 5, 7];
  const values = []
  for (const n of numbers) {
    if (num % n === 0) {
      const divisor = num / n;
      const value = [n, divisor]
      let sum = value.reduce((accumulator, value) => value + accumulator);
      while (sum < num) {
        value.push(1);
        sum = value.reduce((accumulator, value) => value + accumulator);
      }
      if (sum === num) {
        values.push(value)
      }
        for (const nextNum of numbers) {
          let n_factors = n;
          let div_factors = divisor; 
          let n_div;
          let div_div;
        if (n_factors % nextNum === 0) {
          while (prime.includes(n_factors) === false) {
            n_div = n_factors / nextNum;
            const value = [nextNum, n_div, divisor];
            let sum = value.reduce((accumulator, value) => value + accumulator);
            while (sum < num) {
              value.push(1);
              sum = value.reduce((accumulator, value) => value + accumulator);
            }
            if (sum === num) {
              values.push(value)
            }
            n_factors = n_div;
            if (div_factors % nextNum === 0) {
              while (prime.includes(div_factors) === false) {
                div_div = div_factors / nextNum;
                const value = [nextNum, div_div, n_factors];
                let sum = value.reduce((accumulator, value) => value + accumulator);
                while (sum < num) {
                  value.push(1);
                  sum = value.reduce((accumulator, value) => value + accumulator);
                }
                if (sum === num) {
                  values.push(value)
                }
                div_factors = div_div;
              }
            }
          }
        }
      }
    }
  }
  
  return combinations([...new Set(values)])
}

const combinations = function* (values) {
  for (const value of values) {
    let copy = [...value]
    for (let index = 0; index <= value.length; index += 1) {
      let slice = copy.slice(0, 1).pop();
      copy.splice(0, 1);
      copy = [...copy, slice];
      yield Number(copy.join(''))
    }
  }
}

for (const value of findProductSumsFor(12)) {
  console.log(value)
} 