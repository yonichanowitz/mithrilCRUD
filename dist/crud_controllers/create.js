import m from 'mithril';
import MessageState from './message_state';
import MessageRenderer from './message_renderer';
var CreateMessage = {
    body: "",
    create: function (body) {
        MessageState.messages.push({
            id: generateId(),
            body: body
        });
    },
    view: function () {
        return m('div', [
            m('h1', 'Create Message'),
            m('form', {
                onsubmit: function (e) {
                    e.preventDefault();
                    CreateMessage.create(CreateMessage.body);
                }
            }, [
                m('label.label', 'Body'),
                m('input.input[placeholder=Body]', {
                    // oninput: function(event: Event) {CreateMessage.body = event.currentTarget.value}},
                    oninput: function (event) { CreateMessage.body = event.currentTarget.value; },
                    value: this.body
                }),
                m('button.button[type=submit]', 'Save')
            ]),
            m(MessageRenderer)
        ]);
    }
};
function generateId() {
    //check what last message in MessageState.messages is and increment it by 1, return that value
    return MessageState.messages.length + 1;
}
export default CreateMessage;
