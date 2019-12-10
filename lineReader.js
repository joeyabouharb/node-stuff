const readline = require('readline');

const createLinereader = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

module.exports = {
  createLinereader,
};
