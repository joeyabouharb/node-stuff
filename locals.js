const CHOICES = [ 'ROCK', 'PAPER', 'SCISSORS' ]

const OUTCOMES = {
  WIN: 'win',
  LOOSE: 'loose',
  DRAW: 'draw',
};
const RULESET = [
  [OUTCOMES.DRAW, OUTCOMES.LOOSE, OUTCOMES.WIN],
  [OUTCOMES.WIN, OUTCOMES.DRAW, OUTCOMES.LOOSE],
  [OUTCOMES.LOOSE, OUTCOMES.WIN, OUTCOMES.DRAW]
]

const OPPONENT_NAME = 'CPU';

const INITIAL_SCORE = {
  "wins": 0,
  "losses": 0,
  "games": 0,
  "matches": []
};

const SCOREBOARD_DB = './scoreboard.json';

module.exports = {
  RULESET, OPPONENT_NAME, INITIAL_SCORE,
  OUTCOMES, SCOREBOARD_DB, CHOICES
}