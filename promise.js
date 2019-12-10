let x = 2;
let y = 5;
let calculation = new Promise((resolve, reject) => {
    let answer = x + y;
    if (isNaN(answer)) {
        reject("Input needs to be a number");
    }
    resolve(answer);
});
calculation
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err)
    });
console.log(1);
