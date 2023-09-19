import m from 'mithril'
import CurrMessageState from './message_state'

const deleteMessage = function (messageId: number) {
    CurrMessageState.messages = CurrMessageState.messages.filter(message => message.id !== messageId)
    //mithril redraw
    m.redraw()
}

export {deleteMessage}