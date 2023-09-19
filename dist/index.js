var m = require('mithril');
import CreateMessage from "./crud_controllers/create";
import MessageState from "./crud_controllers/message_state";
import MessageRenderer from "./crud_controllers/message_renderer";
import Navbar from "./crud_controllers/navbar";
var ShowSingleMessage = {
    show: function (messageId) {
        return MessageState.messages.filter(function (mesage) { return mesage.id == messageId; });
    },
    view: function () {
        return m('div', [
            m(Navbar),
            m("div", this.show)
        ]);
    }
};
m.route(document.body, "/home", {
    "/home": MessageRenderer,
    "/new": CreateMessage,
    "/:id": ShowSingleMessage,
});
