import m from 'mithril';
import MessageState from './message_state';
var deleteMessage = function (messageId) {
    MessageState.messages = MessageState.messages.filter(function (message) { return message.id !== messageId; });
    //mithril redraw
    m.redraw();
};
export { deleteMessage };
