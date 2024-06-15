import React from "react";
import ReactDOM from "react-dom/client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" sx={{margin:"2%"}} > Mein Portal </Typography>
      <Box sx={{ flexGrow: 1,marginLeft:"1%",marginRight:"1%"}}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Paper> News </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper> News </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper> News </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper> News </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper> News </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper> News </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
