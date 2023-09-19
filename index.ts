const m = require('mithril')
import CreateMessage from "./crud_controllers/create";
import MessageState from "./crud_controllers/message_state";
import MessageRenderer from "./crud_views/message_renderer";
import Navbar from "./crud_controllers/navbar";

import PokeView from "./pokemon_views/all_pokemon";

type SingleMessage = {
    id: number,
    body: string
}


const ShowSingleMessage = {
    show(messageId: number) {
        return MessageState.messages.filter((mesage: SingleMessage) => mesage.id == messageId)
    },
    view: function() {
        return m('div', [
            m(Navbar),
            m("div", this.show)
        ])
    }

}

m.route(document.body, "/home", {
    "/home": MessageRenderer,
    "/new": CreateMessage,
    "/pokemonlist": PokeView,
    "/:id": ShowSingleMessage,
    
})
