import React from 'react';
import ReactDOM from 'react-dom/client';
import {useState} from 'react';
import axios from 'axios';
import "./usertable.css"
import Box from "@mui/material/Box"
import { Typography } from '@mui/material';

const IP = "https://gknrod8tfd.execute-api.eu-central-1.amazonaws.com/dev"



export default function Usertable(){
    return(
        <Box paddingLeft={"3%"} >
                    <Typography variant="h3" textAlign={"center"}> Mitglieder</Typography>
                    <br/>
                    <Tabelle style={{maxWidth:"fit-content", marginLeft:"auto",marginRight:"auto"}}/>
        </Box>
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
        <Box sx={{maxWidth:"fit-content",marginLeft:"auto",marginRight:"auto"}}>
            <form onSubmit={HandleSubmit}>
                <table style={{border: "1px solid", textAlign:"center", fontSize:"larger"}}>
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
        </Box>
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


