import React from 'react';
import ReactDOM from 'react-dom/client';
import {useState} from 'react';
import {render} from "@testing-library/react";
import {FiAlignJustify} from "react-icons/fi";
import axios from 'axios';
import NavBar from '../navbar.js';
import "./usertable.css"

const IP = "https://gknrod8tfd.execute-api.eu-central-1.amazonaws.com/dev"



export default function Grouptable(){
    return(
        <div className={"testing"}>
            <body>
            <h1 className={"Überschrift"}>
                Vereinsverwaltung
            </h1>
            <div className={"NaviTab"}>
                <NavBar/>
                <div className={"Tablediv"}>
                    <h2 style={{fontFamily: "Bahnschrift, serif"}}><br/>club table</h2>
                    <br/>
                    <h4>
                        <Tabelle className="Tabelle"/>
                    </h4>
                </div>
            </div>
            </body>
        </div>
    )
}

function Tabelle() {

    const [data,setdata] = useState([])

    const getVereine = () => {axios.get(IP + "/clubs").then(res => {console.log(res);setdata(res.data)}).catch(err => { setdata(null)})}

    React.useEffect(() => {
        getVereine();
    },[]);
    console.log(data)

    return (
        <>
            <table class="Tabelle">
                    <tr>
                        <th>Name</th>
                        <th>VKZ-Nummer</th>
                    </tr>
                    <Backend data={data} setdata={setdata}/>
                </table>
        </>
    );
}


function Backend({data}){

if (data == null)
return(
    <div>
        Keine Verbindung zum Server!
    </div>
)

return(
    <>
    {data.map(function(d){
            return(
                        <tr>
                            <td>{console.log(d)}{d.name}</td>
                            <td>{d.id}</td>
                        </tr>
                	)
            }
        )}
    </>
)
}


