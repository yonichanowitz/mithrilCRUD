import m from 'mithril'
import PokeAPI from 'pokedex-promise-v2';
const P = new PokeAPI();

type PokeStats = {
    abilities: any[],
    base_experience: number,
    forms: any[],
    game_indices: any[],
    height: number,
    held_items: any[],
    id: number,
    is_default: boolean,
    location_area_encounters?: string,
    moves: any[],
    name: string,
    order: number,
    species: any[],
    sprites: any[],
    stats: any[],
    types: any[],
    weight: number
}

const PokeView = {
    PokeData: [] as any[],
    showStats: false,
    oninit: function() {
        m.request({
            method: "GET",
            url: "https://pokeapi.co/api/v2/pokemon/?limit=150"
        }).then((response: any) => {
            console.log(response.results);
            PokeView.PokeData = response.results;
        })
    },
    view: function () {
        return m("div.poke-list", [this.PokeData ? 
            m("ul", [
                this.PokeData.map((pokemon) => 
                {return m("li", [
                    pokemon.name,
                    this.showStats ? m(SinglePokemon, {id: pokemon.name}) : null,
                    m("button", {onclick: () => {this.showStats = !this.showStats}}, "Show Stats")
                ])
                })
            ]) 
                : "Loading...",
            m("div", "dude")
        ])
    }
}

const SinglePokemon = {
    pokedetails: [] as PokeStats[],
    oninit: function(vnode: any) {
        m.request({
            method: "GET",
            url: "https://pokeapi.co/api/v2/pokemon/" + vnode.attrs.id
        }).then((response: any) => {
            console.log(response);
            SinglePokemon.pokedetails = response;
        })
    },
    view: function(vnode: any) {
        return m("div", this.pokedetails)
        
        // .map((pokemon) => {
        //     return m("div", [
        //         m("div", "Name: " + pokemon.name),
        //         m("div", "Height: " + pokemon.height),
        //         m("div", "Weight: " + pokemon.weight),
        //         m("div", "Base Experience: " + pokemon.base_experience),
        //         m("div", "Abilities: " + pokemon.abilities.map((ability) => {
        //             return m("div", ability.ability.name)
        //         })),
        //         m("div", "Moves: " + pokemon.moves.map((move) => {
        //             return m("div", move.move.name)
        //         })),
        //         m("div", "Stats: " + pokemon.stats.map((stat) => {
        //             return m("div", stat.stat.name + ": " + stat.base_stat)
        //         })),
        //         m("div", "Types: " + pokemon.types.map((type) => {
        //             return m("div", type.type.name)
        //         })),
        //         m("div", "Sprites: " + pokemon.sprites.front_default)
        //     ])
        // }))
    }
}

export default PokeView