const readline = require('readline');
const fs = require('fs');

const lineReader = async function () {
  const line = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  line.setPrompt('Filename: ')
  line.prompt()
  const bla = line.on('line', (input) => {
    line.emit('end');
    return input
  })
  line.on('end', () => {
    line.close()
  })
  return await bla
}

const proccessLine = async function (fileName) {
  const fileStream =  fs.createReadStream(file);
  console.log(fileStream);
  const cursor = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })
  for await (const line of cursor) {
    console.log(line)
  }
}
const file = lineReader()
console.log(file);

