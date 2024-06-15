import React from 'react';
import ReactDOM from 'react-dom/client';
import {useState} from 'react';
import {render} from "@testing-library/react";
import {FiAlignJustify} from "react-icons/fi";
import axios from 'axios';
import NavBar from '../navbar.js';
import "./usertable.css"

const IP = "https://gknrod8tfd.execute-api.eu-central-1.amazonaws.com/dev"



export default function Usertable(){
    return(
        <div className={"testing"}>
            <head>
                <title>Test</title>
                <style>
                </style>
            </head>
            <body>
            <h1 className={"Überschrift"}>
                Mitgliederverwaltung
            </h1>
            <div className={"NaviTab"}>
                <NavBar/>
                <div className={"Tablediv"}>
                    <h2 style={{fontFamily: "Bahnschrift, serif"}}><br/>Usertable</h2>
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
    const [name, setName] = useState("");
    const [age, setage] = useState();
    const [email, setEmail] = useState("");
    const [id, setID] = useState("");
    const [data,setdata] = useState([]);
    const [refresh,setRefresh] = useState(0);

    const getMitglieder = () => {axios.get(IP).then(res => {console.log(res);setdata(res.data)}).catch(err => { setdata(null)})}

    React.useEffect(() => {
        getMitglieder();
        setRefresh(0)
    },[refresh]);
    console.log(data)

    function HandleSubmit(e) {
        e.preventDefault();
        axios.post(IP, ({
        name: name,
        GebDat: age,
        email: email,
        id: id,
        method: "create",
        }))
        //window.location.reload();
        setRefresh(1);
        console.log(refresh)
    }

    return (
        <>
            <form onSubmit={HandleSubmit} className={"UserEingabeFeld"}>
                <table class="Tabelle">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Geburtsdatum</th>
                        <th>PKZ-Nummer</th>
                    </tr>
                    <Backend data={data} setdata={setdata}/>
                    <tr>
                        <td>
                            <input type={"text"} value={name} required={true} placeholder={"Name"}
                                   onChange={(e) => setName(e.target.value)}/>
                        </td>
                        <td>
                            <input type={"text"} name={email} required={true} placeholder={"E-Mail"}
                                   onChange={event => setEmail(event.target.value)}/>
                        </td>
                        <td>
                            <input type={"number"} value={age} required={true} placeholder={"Geburtsdatum"}
                                   onChange={(e) => setage(e.target.value)}/>
                        </td>
                        <td>
                            <input type={"number"} value={id} required={true} placeholder={"ID"}
                                   onChange={(e) => setID(e.target.value)}/>
                        </td>
                    </tr>
                </table>
                <button style={{marginTop: "1em"}} type={"submit"}>Neuen User Hinzufügen</button>
            </form>
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

    function deleteUser(e,id){
            console.log(id)
            e.preventDefault();
            axios.post(IP,{
                "id": id,
                "method": "delete"
            }).then(response => {console.log(response);console.log(`Deleted post with ID` ,data.id);}).catch(error => {console.error(error);})
            window.location.reload();
    }

return(
    <>
    {data.map(function(d){
            return(
                        <tr>
                            <td>{d.name}</td>
                            <td>{d.email}</td>
                            <td>{d.GebDat}</td>
                            <td>{d.id}</td>
                            <td><button onClick={(e) => deleteUser(e,d.id)}> Delete </button></td>
                        </tr>
                	)
            }
        )}
        </>
)
}


