/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const fs = require('fs');
const { createLinereader } = require('./lineReader');
const {
  CHOICES, OUTCOMES, RULESET,
  OPPONENT_NAME, INITIAL_SCORE, SCOREBOARD_DB,
} = require('./locals');
const { MENUS, counter } = require('./services');

const promptUser = ({ prompt, validate }) => (
  new Promise((resolve, reject) => {
    try {
      const line = createLinereader();
      line.setPrompt(`${prompt} `);
      line.prompt();
      line.on('line', async (selection) => {
        const out = validate(selection);
        if (out !== undefined) {
          resolve(out);
          line.close();
        } else {
          line.setPrompt(`Incorrect selection. ${prompt} `);
          line.prompt();
        }
      });
    } catch (err) {
      reject(err);
    }
  })
);


const promptComputer = () => {
  const random = Math.floor(Math.random() * 90);
  if (random < 30) {
    return 0;
  } if (random < 60) {
    return 1;
  }
  return 2;
};

const outcomeOfMatch = (game, userName, gameCount, won, lost) => {
  switch (game) {
    case OUTCOMES.WIN:
      won().increment();
      return { match: gameCount().value, winner: userName };
    case OUTCOMES.LOOSE:
      lost().increment();
      return { match: gameCount().value, winner: OPPONENT_NAME };
    default:
      return { match: gameCount().value, winner: OUTCOMES.DRAW };
  }
};

const run = async () => {
  let isRunning = true;
  const db = fs.readFileSync(SCOREBOARD_DB);
  const scoreDB = JSON.parse(db);
  const userName = await promptUser(MENUS.GREETING);
  const {
    wins, games, losses, matches,
  } = scoreDB[userName] || INITIAL_SCORE;
  const gameCount = counter(games);
  const won = counter(wins);
  const lost = counter(losses);
  while (isRunning) {
    gameCount().increment();
    console.log(`Match: ${gameCount().value}`);
    const userChoice = await promptUser(MENUS.SELECTIONS);
    const computerChoice = promptComputer();
    console.log(
      `You Played: ${CHOICES[userChoice]}. Your Opponent: ${CHOICES[computerChoice]}`,
    );
    const game = RULESET[userChoice][computerChoice];
    matches.push(outcomeOfMatch(game, userName, gameCount, won, lost));
    console.log(`You ${game}! current wins: ${won().value}, losses: ${lost().value}`);
    isRunning = await promptUser(MENUS.END);
  }
  console.log(`Goodbye, ${userName}!`);
  const userBoard = {
    [userName]: {
      games: gameCount().value,
      losses: lost().value,
      wins: won().value,
      matches,
    },
  };
  const updatedLeaderboard = { ...scoreDB, ...userBoard };
  const data = JSON.stringify(updatedLeaderboard);
  fs.writeFileSync(SCOREBOARD_DB, data);
};

run();
