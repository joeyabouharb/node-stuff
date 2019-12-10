
const pokemonList = [];
const fetch = require('node-fetch');

function generateUrlForRandomPokemon() {
  return `https://pokeapi.co/api/v2/pokemon/${Math.ceil(Math.random() * 808)}`;
}
const pokemonArray = [
  fetch(generateUrlForRandomPokemon()),
  fetch(generateUrlForRandomPokemon()),
  fetch(generateUrlForRandomPokemon()),
  fetch(generateUrlForRandomPokemon()),
  fetch(generateUrlForRandomPokemon()),
];

const listPokemon = () => {
  pokemonList.forEach((pokemon) => {
    const { name } = pokemon;
    console.log(name);
  });
};

Promise.all(pokemonArray)
  .then((responses) => Promise.all(
    responses.map((response) => response.json()),
  ),).then((pokemon) => {
    pokemonList.push(...pokemon);
    listPokemon();
  });
