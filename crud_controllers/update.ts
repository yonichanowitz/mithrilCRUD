import m from 'mithril';
import CurrMessageState from './message_state';


const UpdateMessage = {
    update: function(messageId: number, body: string) {
        let editing = CurrMessageState.messages.find((message) => message.id === messageId) || {body: ""}; 
        return editing.body = body;   
    },
    view: (props?: any) => {
        return m('div', [
            m('form', {
                onsubmit: function(e: Event) {
                    e.preventDefault();
                    UpdateMessage.update(props.attrs.id, CurrMessageState.inEditString);
                    CurrMessageState.inEditString = "";
                    props.attrs.set();
                }
            }, [
                m('label.label', 'Body'),
                m('input.input[placeholder=Body]', {
                    oninput: function(e: Event) {CurrMessageState.inEditString = (e.currentTarget as HTMLButtonElement).value},
                    value: CurrMessageState.inEditString
                }),
                m('button.button[type=submit]', 'Save')
            ])
        ])
    }
}

export default UpdateMessage