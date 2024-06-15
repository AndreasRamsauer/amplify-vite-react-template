import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route } from "react-router-dom";
import Usertable from './pages/usertable.js';
import { BrowserRouter } from 'react-router-dom';
import { TopMenu } from "./top_menu";
import SmileSidebar from "./smile_sidebar";
import { useTheme, Box, Typography, IconButton } from "@mui/material";
import Dashboard from "./dashboard.jsx"
import Test from "./pages/test.jsx"
import Grouptable from './pages/grouptable.js';
import { createTheme } from '@mui/material/styles';
import theme from './theme.jsx';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Auth from "./auth.jsx"
//import config from './amplifyconfiguration.json';
import { Amplify } from 'aws-amplify';

const IP = "https://gknrod8tfd.execute-api.eu-central-1.amazonaws.com/dev"
//const IP = "http://localhost:8000/mitglieder/"

//Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <BrowserRouter>
            <App/>
        </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);

export default function App() {
    return (
      <>
        <Box sx={{marginLeft:"240px"}}>
          <TopMenu></TopMenu>
        </Box>
        <Box sx={{position: "fixed",display: "flex",height: "100vh",top: 0,bottom: 0,zIndex: 10000,width: "240px",}}>
          <SmileSidebar></SmileSidebar>
        </Box>
        <Routes>
            <Route path="/" element={<Box sx={{marginLeft:"250px"}}><Dashboard></Dashboard></Box>} ></Route>
            <Route path="/login" element={<Box></Box>} ></Route>
            <Route path="/users" element={<Box sx={{marginLeft:"250px"}}><Usertable></Usertable></Box>}></Route>
            <Route path="/clubs" element={<Box sx={{marginLeft:"250px"}}><Grouptable></Grouptable></Box>}></Route>
            <Route path="/search_users" element={<Box sx={{marginLeft:"250px"}}><Test></Test></Box>}></Route>
        </Routes>
      </>
    );
  }