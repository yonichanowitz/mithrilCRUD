import m from 'mithril'
import UpdateMessage from '../crud_controllers/update'
import {deleteMessage} from '../crud_controllers/delete'
import {Message} from '../crud_controllers/customTypes/message_type'

const MessageView = {
    editState: false,
    changeEditState: function() {
        MessageView.editState = !MessageView.editState;
    },
    view: function(message: m.Vnode<Message>) {
        return m('li', [
            m("div.message-body", [
                m("p", message.attrs.body),
                m("button", {onclick: ()=> {deleteMessage(message.attrs.id)}}, "Delete"),
                m("br"),
                m("button", {onclick: () => {this.editState = !this.editState}}, "Edit"),
                this.editState ? m(UpdateMessage, {id: message.attrs.id, set: () => {this.editState = !this.editState}}) : null,
            ]),
        ])
    }
}

export default MessageView