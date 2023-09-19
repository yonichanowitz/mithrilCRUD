"use strict";
var m = require('mithril');
var MessageState = {
    messages: [{ id: 1, body: 'the dudest dude of all dudes' }],
    inEditString: "",
    single: false,
};
function generateId() {
    //check what last message in MessageState.messages is and increment it by 1, return that value
    return MessageState.messages.length + 1;
}
var CreateMessage = {
    body: "",
    create: function (body) {
        MessageState.messages.push({
            id: generateId(),
            body: body
        });
    },
    view: function (messageForm) {
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
                    oninput: function (event) { CreateMessage.body = event.currentTarget.value; },
                    value: this.body
                }),
                m('button.button[type=submit]', 'Save')
            ]),
            m(MessageRenderer)
        ]);
    }
};
//mithril componenet called 'Passer' that sends a string to it's parent component, and takes a function as a prop that it calls when it's clicked
var Passer = {
    view: function (vnode) {
        return m('div', [
            m('button', { onclick: vnode.attrs.clickFunction }, 'Click Me')
        ]);
    }
};
var UpdateMessage = {
    update: function (messageId, body) {
        var editing = MessageState.messages.find(function (message) { return message.id === messageId; });
        return editing.body = body;
    },
    view: function (props) {
        return m('div', [
            m('form', {
                onsubmit: function (e) {
                    e.preventDefault();
                    UpdateMessage.update(props.attrs.id, MessageState.inEditString);
                    MessageState.inEditString = "";
                    props.attrs.set();
                }
            }, [
                m('label.label', 'Body'),
                m('input.input[placeholder=Body]', {
                    oninput: function (e) { MessageState.inEditString = e.currentTarget.value; },
                    value: MessageState.inEditString
                }),
                m('button.button[type=submit]', 'Save')
            ])
        ]);
    }
};
var deleteMessage = function (messageId) {
    MessageState.messages = MessageState.messages.filter(function (message) { return message.id !== messageId; });
    //mithril redraw
    m.redraw();
};
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
var MessageView = {
    editState: false,
    changeEditState: function () {
        MessageView.editState = !MessageView.editState;
    },
    view: function (message) {
        var _this = this;
        return m('li', [
            m("div.message-body", [
                m("p", message.attrs.body),
                m("button", { onclick: function () { deleteMessage(message.attrs.id); } }, "Delete"),
                m("br"),
                m("button", { onclick: function () { _this.editState = !_this.editState; } }, "Edit"),
                this.editState ? m(UpdateMessage, { id: message.attrs.id, set: function () { _this.editState = !_this.editState; } }) : null,
            ]),
        ]);
    }
};
var MessageRenderer = {
    view: function () {
        return m("div", [
            m(Navbar),
            m("ul", MessageState.messages.map(function (mesage) {
                return m(MessageView, mesage);
            }))
        ]);
    }
};
var Navbar = {
    view: function () {
        return m("ul", [
            m("li", m(m.route.Link, { href: "/" }, "Home")),
            m("li", m(m.route.Link, { href: "/new" }, "Create Message")),
        ]);
    }
};
m.route(document.body, "/home", {
    "/home": MessageRenderer,
    "/new": CreateMessage,
    "/:id": ShowSingleMessage,
});
