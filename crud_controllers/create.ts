import m from 'mithril'
import CurrMessageState from './message_state'
import MessageRenderer from '../crud_views/message_renderer'

const CreateMessage = {  
    body:"", 
    title: "",
    create(body: string, title?: string, image?: string) {
        CurrMessageState.messages.push({
            id: generateId(),
            title: title,
            image: image,
            body: body
        })
    },
    view: function() {
        return m('div', [
            m('h1', 'Create Message'),
            m('form', {
                onsubmit: function(e: Event) {
                    e.preventDefault()
                    CreateMessage.create(CreateMessage.body)
                }
            }, [
                m('label.label', 'Title'),
                m('input.input[placeholder=Title]', {
                    oninput: function(event: Event) {CreateMessage.title = (event.currentTarget as HTMLButtonElement).value},
                    value: this.title
                }),
                m('label.label', 'Body'),
                m('input.input[placeholder=Body]', {
                    // oninput: function(event: Event) {CreateMessage.body = event.currentTarget.value}},
                    oninput: function(event: Event) {CreateMessage.body = (event.currentTarget as HTMLButtonElement).value},
                    value: this.body
                }),
                m('button.button[type=submit]', 'Save')
            ]),
            m(MessageRenderer)
        ])
    }
}

function generateId() {
    //check what last message in CurrMessageState.messages is and increment it by 1, return that value
    return CurrMessageState.messages.length + 1;
}

export default CreateMessage