function* range({ start = 0, end, step = 1 }) {
  for (let i = start; i <= end; i += step) {
    yield i;
  }
}

function* generateCombinationFor(value, num) {
	if (value === 1) {
		yield Array.from(
			{ length: num }, () => 1
		);
	}
	const maxValue = ({ num, value, freq = 0}) = num - value - freq;
	const maxFreq =  [...range({ start: 1, end: maxValue({ num, value }) })];
	for (let freq of maxFreq) {	
		const maxSize = maxValue({ num, value, freq })
		for (let currentKey of maxSize) {
			const arr = [...range({ end: maxSize })].map((_, k, self) => {
				if (k <= currentKey) {
					const predictSum = (reducer, value) => reducer + value;
					const currentSum = self.reduce((reducer, value) => reducer + value);
					while(predictSum(currentSum, value) > num) {
						value -= 1;
					}
					return value;
				} else {
					
				}
			});
		}
	}
}

const possibleSumProducts = (num) => {
	const start = 1;
	const end = 9;
	// create an array from 1-9
	const numbers = [...range({ start, end })]
	const combinations = numbers.map((value) => {
		return generateCombinationFor(value, num)
	})

	return combinations

	
} 
console.log(possibleSumProducts(123));
console.log(sumProductCheck(123))
