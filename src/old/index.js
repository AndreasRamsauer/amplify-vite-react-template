import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import "./navbar.js"
import "./pages/home.js"
import Home from './pages/home.js';
import Test from './pages/test.js';
import New from './pages/new.jsx';
import Usertable from './pages/usertable.js';
import Grouptable from './pages/grouptable.js';
import '@aws-amplify/ui-react/styles.css';
import "./auth.js"
import Auth from "./auth.js"
import { BrowserRouter } from 'react-router-dom';

const IP = "https://gknrod8tfd.execute-api.eu-central-1.amazonaws.com/dev"
//const IP = "http://localhost:8000/mitglieder/"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <New/>
        </BrowserRouter>
    </React.StrictMode>
);

function App() {
    //return(<Auth></Auth>)
    console.log(window.location.href)
    console.log(window.location.pathname)
    if(window.location.pathname == "/new/" || window.location.pathname == "/new"){  return(<BrowserRouter><New></New></BrowserRouter>)}
    if(window.location.pathname == "/login/" || window.location.pathname == "/login"){  return(<Auth></Auth>)}
    if(window.location.pathname == "/home/" || window.location.pathname == "/home"){ return (<Home></Home>)}
    if(window.location.pathname == "/test/" || window.location.pathname == "/test"){ return (<Test></Test>)}
    if(window.location.pathname == "/groups/" || window.location.pathname == "/groups"){ return (<Grouptable></Grouptable>)}
    else{
        return <Usertable></Usertable>
    }
}

export default App;
