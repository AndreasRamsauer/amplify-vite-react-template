import React from 'react';
import ReactDOM from 'react-dom/client';
import {useState} from 'react';
import "./test.css"
import axios from 'axios';
import { Flex, Menu, MenuItem, View } from '@aws-amplify/ui-react';
import { Link } from '@aws-amplify/ui-react';
import { SearchField } from '@aws-amplify/ui-react';
import { CheckboxField, Button } from '@aws-amplify/ui-react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { DataGrid } from '@mui/x-data-grid';
import AddUser from './addUser.js';
import Sidebar from "../smile_sidebar.js";
import { TopMenu } from '../top_menu.js';

const IP = "https://gknrod8tfd.execute-api.eu-central-1.amazonaws.com/dev"

export default function Test(){
  const [value, setValue] = React.useState('');
  const [currOrg, setCurrOrg] = React.useState('')
  const [searchedOrg, setsearchedOrg] = React.useState('')
  const [addingUser, setaddingUser] = React.useState(false)

    if(addingUser === true){
      return(
        <AddUser addingUser = {result => {setaddingUser(result)}} currOrg={currOrg}></AddUser>
      )
    }
    if(currOrg === ''){
      return(
        <div>
          <br></br>
          <div style={{paddingLeft:"5%"}}>
            Bitte Verein auswählen:
            <div style={{width:"70%"}}>
              <Vereinsauswahl search = {result => {setsearchedOrg(result)}}></Vereinsauswahl>
            </div>
            <br></br>
            <Ergebnisse verein={searchedOrg} display = {result => {setCurrOrg(result)}}></Ergebnisse>
          </div>
        </div>
      )
    }

    return(
        <body>
            <br></br>
            <div style={{paddingLeft:"5%"}}>
            <div>
              <Suchfeld search= {result => setValue(result)}></Suchfeld>
            </div>
            {value}
            <Flex>
              <DefaultCheckbox name = {"nur aktive Mitglieder"}></DefaultCheckbox>
              <DefaultCheckbox name = {"nur passive Mitglieder"}></DefaultCheckbox>
              <DefaultCheckbox name = {"nur weibliche Spieler"}></DefaultCheckbox>
            </Flex>
            <br></br>
            <div style={{width:"70%"}}>
              <DataGridDemo org_id={currOrg.id} currOrg={currOrg}></DataGridDemo>
            </div>
              <br/>
              <Button onClick={() => setaddingUser(true)}>Add User</Button>
            </div>
        </body>
    )
}

export const DefaultCheckbox = (props) => (
  <CheckboxField label={props.name} name={props.name} value="yes" />
);

export const Menü = () => {
    return (
      <View width="4rem">
        <Menu>
          <MenuItem> <Link href="/home">Home</Link></MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </Menu>
      </View>
    );
  };
  
  export const Suchfeld = (props) => {
    let value;
    const onChange = (event) => {
      value = event.target.value
    };

    const onSubmit = (event) => {
      props.search(value)
    };

    // It is your responsibility to set up onClear
    const onClear = () => {
      //setValue('');
    };
  
    return (
      <SearchField
        label="search"
        onChange={onChange}
        onClear={onClear}
        onSubmit={onSubmit}
        value={value}
      />
    );
  };



  function Vereinsauswahl(props){
    let value;
    const onChange = (event) => {
      value = event.target.value
    };

    const onSubmit = (event) => {
      console.log(value);
      axios.post("https://gknrod8tfd.execute-api.eu-central-1.amazonaws.com/dev/search/club",{name: value})
      .then(result => {props.search(result.data)
      console.log("Found:")
      console.log(result.data)})
    };

    // It is your responsibility to set up onClear
    const onClear = () => {
      //setValue('');
    };
  
    return (
      <SearchField
        label="search"
        onChange={onChange}
        onClear={onClear}
        onSubmit={onSubmit}
        value={value}
      />
    );
  };


  function Ergebnisse (props){
    if(props.verein != ""){
    return (
      <Button loadingText="" onClick={() => props.display(props.verein)}>{/*JSON.stringify(props.verein)*/props.verein.map((v) => (v.name + " " + " || Bundesland: " + v.Bundesland + " Stadt: " + v.Stadt))}</Button>
    )}
  }


function DataGridDemo(props) {
  const [currPlayers, setCurPlayers] = React.useState("")


  const get_users = () => axios.get(IP + "/clubs/" + props.org_id).then(res => {setCurPlayers(res.data);console.log(res.data)})

  React.useEffect(
    () => {get_users()
    },[props.currOrg]
  )


  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'Vorname',
      headerName: 'Vorname',
      width: 150,
      editable: true,
    },
    {
      field: 'Name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'type',
      headerName: 'Mitgliedschaft',
      width: 150,
      editable: true,
    },
    {
      field: 'GebDat',
      headerName: 'Geburtsdatum',
      width: 150,
      editable: true,
    },
    {
      field: 'Geschlecht',
      headerName: 'Geschlecht',
      width: 150,
      editable: true,
    },]
    
    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={currPlayers}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    );
  }