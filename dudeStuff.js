const m = require('mithril')

const MessageState = {
    messages: [{id:1, body: 'the dudest dude of all dudes'}],
    inEditString: "",
    single: false,
}


function generateId() {
    //check what last message in MessageState.messages is and increment it by 1, return that value
    return MessageState.messages.length + 1;
}

const CreateMessage = {  
    body:"", 
    create(body) {
        MessageState.messages.push({
            id: generateId(),
            body: body
        })
    },
    view: function(messageForm) {
        return m('div', [
            m('h1', 'Create Message'),
            m('form', {
                onsubmit: function(e) {
                    e.preventDefault()
                    CreateMessage.create(CreateMessage.body)
                }
            }, [
                m('label.label', 'Body'),
                m('input.input[placeholder=Body]', {
                    oninput: function(event) {CreateMessage.body = event.currentTarget.value},
                    value: this.body
                }),
                m('button.button[type=submit]', 'Save')
            ]),
            m(MessageRenderer)
        ])
    }
}

//mithril componenet called 'Passer' that sends a string to it's parent component, and takes a function as a prop that it calls when it's clicked
const Passer = {
    view: function(vnode) {
        return m('div', [
            m('button', {onclick: vnode.attrs.clickFunction}, 'Click Me')
        ])
    }
}

const UpdateMessage = {
    update: function(messageId, body) {
        let editing = MessageState.messages.find((message) => message.id === messageId); 
        return editing.body = body;   
    },
    view: (props) => {
        return m('div', [
            m('form', {
                onsubmit: function(e) {
                    e.preventDefault();
                    UpdateMessage.update(props.attrs.id, MessageState.inEditString);
                    MessageState.inEditString = "";
                    props.attrs.set();
                }
            }, [
                m('label.label', 'Body'),
                m('input.input[placeholder=Body]', {
                    oninput: function(e) {MessageState.inEditString = e.currentTarget.value},
                    value: MessageState.inEditString
                }),
                m('button.button[type=submit]', 'Save')
            ])
        ])
    }
}

const deleteMessage = function (messageId) {
    MessageState.messages = MessageState.messages.filter(message => message.id !== messageId)
    //mithril redraw
    m.redraw()
}


const ShowSingleMessage = {
    show(messageId) {
        return MessageState.messages.filter((mesage) => mesage.id == messageId)
    },
    view: function() {
        return m('div', [
            m(Navbar),
            m("div", this.show)
        ])
    }

}

const MessageView = {
    editState: false,
    changeEditState: function() {
        MessageView.editState = !MessageView.editState;
    },
    view: function(message) {
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
const MessageRenderer = {
    view: function() {
        return m("div", [
            m(Navbar),
            m("ul", MessageState.messages.map((mesage) =>
                {   
                    return m(MessageView, mesage);
                }
            ))
        ])
    }
}

const Navbar = {
    view: function() {
        return m("ul", [
            m("li",m(m.route.Link, {href: "/"} , "Home")),
            m("li",m(m.route.Link, {href: "/new"} , "Create Message")),                        
        ])           
    }
}

m.route(document.body, "/home", {
    "/home": MessageRenderer,
    "/new": CreateMessage,
    "/:id": ShowSingleMessage,
})
