import m from "mithril"

const Navbar = {
    view: function() {
        return m("ul", [
            m("li",m(m.route.Link, {href: "/"} , "Home")),
            m("li",m(m.route.Link, {href: "/new"} , "Create Message")),                        
        ])           
    }
}

export default Navbar