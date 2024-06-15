import React from 'react';
import ReactDOM from 'react-dom/client';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton,Button,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export function TopMenu() {
      return (
        <Box >
          <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
                <Button color="inherit" variant='outlined' >Login</Button>
            </Toolbar>
          </AppBar>
        </Box>
      );
    }