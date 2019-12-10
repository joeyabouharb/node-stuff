const counter = ((num) => {
  return () => {
    const value = num;
    const increment = (value = 1) => {
      num += value;
      return num;
    };
    return { increment, value };
  }
});

const numberSplitter = ((num, divisor = 10) => {
  return () => {
    const value = num;
    const split = () => {
      num = (num / divisor) | 0;
      return num;
    }
    return { split, value }
  }
});


function* validRange(start = 1, end) {
  for (const loop = counter(start); loop().value < end; loop().increment()) {
    const splitter = numberSplitter(loop().value);
    const count = counter(0);

    while (splitter().value > 1) {
      if (splitter().value % 10 === 0) {
        loop().increment(Math.pow(10, count().value))
      }
      splitter().split();
      count().increment();
    }
    yield loop().value;
  }
}

const filterSumProducts = function* (value) {
	const divideNumBy = (num, divisor = 10) => (num / divisor) | 0;
	const toList = []
	let currentNum = value;
	while(currentNum >= 1) {
		let result = currentNum % 10;
		toList.push(result);
		currentNum = divideNumBy(currentNum);
	}
  const sum = toList.reduce((accumulator, value) => accumulator + value);
  const product = toList.reduce((accumulator, value) => accumulator * value);
  if (sum === product) {
    yield value;
  }
}


const calculateSumProductsFrom = function* (value = 1000000) {
  const values = validRange(1, value);
  for (const item of values) {
    const filtered = filterSumProducts(item)
    for (const num of filtered) {
      yield num;
    }
  }
}

const sumProductGenerator = calculateSumProductsFrom();

for (const num of sumProductGenerator) {
  console.log(num)
}