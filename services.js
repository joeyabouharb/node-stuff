const { CHOICES } = require('./locals');

const validGame = (selection) => {
  for (let choice = 0; choice < CHOICES.length; choice += 1) {
    if (CHOICES[choice] === selection.toUpperCase()) {
      return choice;
    }
  }
  return undefined;
};

const validName = (selection) => {
  if (selection) {
    return selection;
  }
  return undefined;
};

const yesOrNo = (selection) => {
  if (selection.toLowerCase() === 'yes') {
    return true;
  } if (selection.toLowerCase() === 'no') {
    return false;
  }
  return undefined;
};

const MENUS = {
  GREETING: { prompt: 'What is your player name?', validate: (selection) => validName(selection) },
  SELECTIONS: { prompt: `Select: ${CHOICES.join(', ')}`, validate: (selection) => validGame(selection) },
  END: { prompt: 'Do you want to play again?', validate: (selection) => yesOrNo(selection) },
};

const counter = ((initial) => {
  let value = initial;
  return () => {
    const increment = () => { value += 1; };
    return { increment, value };
  };
});

module.exports = {
  MENUS, counter,
};
