import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { TopMenu } from "../top_menu";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/en-gb";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { Controller,useForm } from 'react-hook-form';

const IP = "https://gknrod8tfd.execute-api.eu-central-1.amazonaws.com/dev"


export default function AddUser(props) {
  return (
    <div>
      <br />
      <div style={{ paddingLeft: "3%" }}>
        <div>Benutzer hinzufügen:</div>
        <AddUserForm back = {() => props.addingUser(false)}/>
      </div>
    </div>
  );
}





function AddUserForm(props) {

  const options = ["Mann", "Frau"];
  const form = useForm()
  const { control, register, handleSubmit} = form
  
  const onSubmit = (data) =>{

    console.log(data);
    axios.post(IP, ({
      data,
      club: props.currOrg,
      method: "create",
      })).then(
        res => {
          if(res.status === 200){
            props.back()
          }
        }
      ).catch(function (error) {
        console.log(error);
        alert("an Error Orccured")
      });
  }

  const handleBack = () => {
    props.back()
    console.log("going Back")
  }

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="Name"
              defaultValue=""
              {...register("lastname")}
            />
            <TextField
              required
              id="outlined-required"
              label="Vorname"
              defaultValue=""
              {...register("firstname")}
            />
            <Controller
              control={control}
              name="birthdate"
              render={({ field }) => (
                <DatePicker
                  label="Geburtstag"
                  placeholderText="Select date"
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                />
              )}
            />

            <div style={{ display: "inline-flex" }}>
              <Autocomplete
                disablePortal
                id="gender"
                options={options}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Geschlecht" {...register("gender")}/>
                )}
              />
            </div>
          </div>
          Kontaktdaten:
          <div>
            <TextField
              required
              id="outlined-required"
              label="Email"
              defaultValue=""
              type="email"
              {...register("email")}
            />
            <TextField
              required
              id="outlined-required"
              label="Telefonnummer"
              defaultValue=""
              type="tel"
              {...register("phone")}
            />

            <TextField
              required
              id="outlined-required"
              label="Straße, Hausnummer"
              defaultValue="" 
              {...register("adress")}
            />
            <TextField required id="outlined-required" label="Stadt" defaultValue="" {...register("city")}/>
          </div>
          Spielereigenschaften:
          <div>
            <TextField id="outlined-required" label="FideID" defaultValue="" {...register("fide_id")} />
            <TextField id="outlined-required" label="Gastspielberechtigung" defaultValue="" {...register("guestplay")}/>
            <Controller
              control={control}
              name="active_since"
              render={({ field }) => (
                <DatePicker
                  label="Aktiv seit"
                  placeholderText="Select date"
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                />
              )}
            />
          </div>
        </div>
        <br></br>
        <Button
          variant="outlined"
          style={{ marginRight: "1em" }}
          onClick={() => handleBack()}
        >
          Zurück
        </Button>
        <Button variant="contained" type="submit">
          Hinzufügen
        </Button>
      </LocalizationProvider>
    </Box>
  );
}
