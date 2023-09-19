import m from 'mithril'
import PokeAPI from 'pokedex-promise-v2';
const P = new PokeAPI();

type Sprites = {
    back_default: string,
    front_default: string
}

type Ability = {
    name: string,
    url: string
}

type Move = {
    name: string,
    url: string 
}

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
    moves: Array<any>,
    name: string,
    order: number,
    species: any[],
    sprites: Sprites,
    stats: any[],
    types: any[],
    weight: number
}

const PokeView = {
    PokeData: [] as any[],
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
        return m("div", [this.PokeData ? 
            m("ul", [
                this.PokeData.map(({name}) => 
                {return m("li", [
                    name,
                    m(SinglePokemon, {id: name}),
                    
                ])
                })
            ]) 
                : "Loading...",
            m("div", "dude")
        ])
    }
}

const SinglePokemon = {
    showStats: false,
    pokedetails: [] as PokeStats[],
    getetails: function(props: any) {
        m.request({
            method: "GET",
            url: "https://pokeapi.co/api/v2/pokemon/" + props
        }).then((response: any) => {
            console.log(response);
            SinglePokemon.pokedetails = response;
        })
    },
    oninit: function(vnode: any) {
    
    },
    view: function(vnode: any) {
        return m("div.poke-list", [
            m("button.button-stats", {onclick: () => {this.getetails(vnode.attrs.id); this.showStats = !this.showStats}}, "Show Stats"),
            this.showStats ?
                    m("div.d-flex", [
                    m("div", "Name: " + this.pokedetails.name),
                    m("div", "Height: " + this.pokedetails.height),
                    m("div", "Weight: " + this.pokedetails.weight),
                    m("div", "Base Experience: " + this.pokedetails.base_experience),
                    m("div", ["Abilities: ", this.pokedetails.abilities.map(({ability}) => {
                        return m("div", ability.name)
                    })]),
                    m("ul.moves-list", ["Moves: ", this.pokedetails.moves.map(({move}) => {
                        return m("li.move", move.name)
                    })]),
                    m("div.moves-list", ["Stats: ", this.pokedetails.stats.map(({stat, base_stat}) => {
                        return m("div", `${stat.name} : ${base_stat}`)
                    })]),
                    m("div", ["Types: ", this.pokedetails.types.map((type) => {
                        return m("div", type.type.name)
                    })]),
                    m("div", ["Sprites: ",m("img", {src: this.pokedetails.sprites.front_default}])
                ])
             : null,
            m("div", "__ __ __ __ ")
        ])
    }
}

export default PokeView