import MessageState from "../message_state"

type Message = {
    id: number,
    title?: string,
    image?: string,
    body: string
}
type MessageState = {
    messages: Message[],
    inEditString: string,
    single: boolean
}

export default MessageState
export {Message}