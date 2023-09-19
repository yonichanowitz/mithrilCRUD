import m from "mithril"
import CurrMessageState from "../crud_controllers/message_state";
import MessageView from "./message_view";
import Navbar from "../crud_controllers/navbar";
import Message from "../crud_controllers/customTypes/message_type";

const MessageRenderer = {
    view: function() {
        return m("div", [
            m(Navbar),
            m("ul", CurrMessageState.messages.map((mesage) =>
                {   
                    return m(MessageView, mesage);
                }
            ))
        ])
    }
}

export default MessageRenderer