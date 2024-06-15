import React from 'react';
import ReactDOM from 'react-dom/client';
import {useState} from 'react';
import "../navbar.js"
import NavBar from '../navbar.js';
//import "../navbar.css"
import axios from 'axios';
import "./home.css"

const IP = "https://gknrod8tfd.execute-api.eu-central-1.amazonaws.com/dev"

export default function Home(){
    return(
        <div>
            <h1 className='Überschrift'>Home</h1>
            <NavBar className="navbar_home"/>
            <br/><br/><br/><br/>
            <div className='searchbar'>
                <h2>Search</h2>
                <Searchbar className="Searchbar"/> 
            </div>
        </div>
    )
}


function Searchbar(){
    const [Query, setQuery] = useState("")
    const [data, setData] = useState([])
    const [groups, setGroups] = useState([])
    const [show, setShow] = useState(false)
    const [foundClub, setFoundClub] = useState(false)
    const [foundPlayer, setFoundPlayer] = useState(false)

    function search(e){
        e.preventDefault();
        setFoundClub(false);
        setFoundPlayer(false);
        console.log(Query)

        ///PLAYERR
        axios({
            method: "post",
            url: "https://gknrod8tfd.execute-api.eu-central-1.amazonaws.com/dev",
            data: {
                name: Query,
                method: "search"
            }
        }).then(res => {
            console.log(res);
            if(res.data == ""){
                setData([{"name":"Keine Ergebnisse gefunden!","email":"","GebDat":""}])
                setFoundPlayer(false)
            } else {
                setData(res.data);
                setFoundPlayer(true);
            }
        })
        .catch(err => { setData([{"name":"Error!"}])})


        ///CLUBBB
        axios.post("https://gknrod8tfd.execute-api.eu-central-1.amazonaws.com/dev/search/club",{name:Query}).then(res => {
        console.log("Club:");
        console.log(res.data)
        if(res.data == ""){
            setFoundClub(false)
        } else{
            setGroups(res.data);
            setFoundClub(true);
        }
        }).then(
        console.log("Found club:" + foundClub),console.log("Player Found:" + foundPlayer))
    }
    return(
        <>
            <form onSubmit={search}>
                <input type={"text"} required={true} placeholder={"Suche"} onChange={(e) => setQuery(e.target.value)}/>
                <button type={"submit"} onClick={() => setShow(true)}>Suchen</button>
            </form>
            <Results found={foundClub} type = {true} res = {groups}></Results>
            <Results found={foundPlayer} res = {data} type = {false}></Results>
            <br/>
        </>
    )
}



function Results({found = false,type = "", res}){

    if(!found){
        return(
            <></>
        )
    }
    if(type == true){
        return(
            <div>
                    {res.map((item) => 
                        <ul className='Ergebniss'>
                            <li>Verein</li>
                            <li>Name: {item.name}</li>
                            <li>ID: {item.id}</li>
                            <li>Bundesland: Bayern</li>
                        </ul>
                    )}                
                </div>
            )
    }
    if(type == false){
        return(
        res.map(function(d){
                return(
                    <ul className='Ergebniss'>
                        {console.log(d)}
                        <li>Spieler</li>
                        <li>Name: {d.name}</li>
                        <li>Email: {d.email}</li>
                        <li>Geburtsdatum: {d.GebDat}</li>
                    </ul>
            )}
        ))
    }             
}
 