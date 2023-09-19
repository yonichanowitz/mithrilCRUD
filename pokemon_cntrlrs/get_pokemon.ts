import exp from 'constants';
import PokeAPI from 'pokedex-promise-v2';
import Pokedex, { NamedAPIResource } from 'pokedex-promise-v2';
const P = new Pokedex();

const PokeList = {
  data: [] as NamedAPIResource[],
  loadPokemon: function() {
    P.getPokemonsList()
    .then((response) => {
      console.log(response.results);
      PokeList.data = response.results;
    }
  )
}
};

export default PokeList;