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
export default MessageRenderer;
