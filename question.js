'use strict';
// const { createLinereader } = require('./lineReader')
const Event = require('events');

const readline = require('readline');

const createLinereader = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

module.exports = {
  createLinereader,
};

const getUserName = () => {
  return new Promise(resolve => {
    try {
      const line = createLinereader();
      const greeting = ' What\'s your Name? ';
      line.setPrompt('Hi I am here to help.' + greeting)
      line.prompt();
      line.on('line', (answer) => {
        if (answer) {
          resolve(answer)
          line.close();
      } else {
        line.setPrompt(`Didn\'t catch that bro.${greeting}` )
        line.prompt();
      }
      })
    } catch (err) {
      reject(err)
    }
  })
}

class Bot extends Event {}

const bot = new Bot()

bot.on('shutdown', (user) => {
  if (user.notFinished.toLowerCase() === 'yes') {
    bot.emit('ask', user)
  } else {
    console.log('goodbye! ')
  }
})

bot.on('greeting', function () {
  const user = {
    name: '',
    problem: '',
    solved: '',
    rating: '',
    isFinished: ''
  }
  getUserName().then(answer => {
    user.name = answer
    bot.emit('ask', user)
  })
})
bot.on('ask', async function(user) {
  const questions = [{
      ask: (name) => `What seems to be the problem ${name}? `, key: 'problem',
    },
    {
      ask: () => 'did that help? ', key: 'solved'
    },
    {
      ask: () => 'How would rate your service today? ', key: 'rating',
    },
    {
      ask: (name) => `Was there anything else ${name}? `, key: 'notFinished'
    },
  ]
  const askQuestion = (question, user) => {
    return new Promise((resolve, reject) => {
      const line = createLinereader();
      line.setPrompt(question.ask(user.name));
      line.prompt();
      line.on('line', (answer) => {
        if (answer) {
          user[question.key] = answer;
          resolve(answer)
          line.close()
        } else {
          line.setPrompt(`Sorry couldn\'t here that. ${question.ask()}`)
          line.prompt();
        }
      })
    });
  }
  const solveProblem = () => {

  }
  for (const question of questions) {
    await askQuestion(question, user)
      //then(answer => question.further(answer, question))
  }

  bot.emit('shutdown', user)
});


bot.emit('greeting')
