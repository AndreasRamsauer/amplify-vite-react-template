import {FiAlignJustify} from "react-icons/fi";
import React from 'react';
import ReactDOM from 'react-dom/client';
import {useState} from 'react';
import "./navbar.css"

export default function NavBar() {

    const [clicked, setclicked] = useState(false)

    function Click() {
        setclicked(!clicked)
        console.log(clicked)
    }

    const navbarelements = [{
        name: "Home",
        Link: "/home"
    },
        {
            name: "UserTable",
            Link: "/"
        },
        {
            name: "Grouptable",
            Link: "/groups"
        },
        {
            name: "Stettings",
            Link: "/"
        }];

    if (clicked) {
        return (
            <nav className={"Navbar"}>
                <button onClick={Click} style={{background: "#0C4B33", border: "none", display: "flex"}}>
                    <FiAlignJustify className={"Navopen"}/>
                </button>
                <div className={"dropdown"}>
                    <ul style={{marginTop: '2em'}}>
                        {
                            navbarelements.map(function (Elements) {
                                return (
                                    <li className={"Navbartext"}>
                                        <a href={Elements.Link} onClick={() => {window.location.reload();}}>
                                            {Elements.name}
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </nav>

        )
    } else {
        return (
            <button onClick={Click} style={{background: "#0C4B33", border: "none", top: 0, position: "fixed"}}>
                <FiAlignJustify className={"Navopen"}/>
            </button>
        )
    }
}