import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import {
  CssBaseline,
  Typography,
  Avatar,
  Grid,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import firebase from "firebase/app"
import TextField from '@material-ui/core/TextField';
import dp from './assets/tomatodp.jpeg'

require('firebase/database');


const useStyle = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: 0,
    alignItems: "center",
    height: "90vh",
  },
  gridChild1a: {
    height: "40%",
    width: "100%",
    justifyContent: "center",
    paddingTop: "20px",
  },
  gridChild1b: {
    height: "60%",
    width: "100%",
    justifyContent: "center",
  },
  gridChild2: {
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
  avatar: {
    position: "abolute",
    margin: "0px auto 0px auto",
    width: "150px",
    height: "150px",
  },
  userName: {
    marginTop: "5px",
    marginBottom: "5px",
  },
  textfields: {
    marginBottom: "30px",
  },
  formcontrol: {
    width: "300px",
  },
  input: {
    display: "none",
  },
}));

function Profile() {

  const classes = useStyle();
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ email, setEmail ] = useState("");
  
  useEffect(() => {
      firebase.database().ref('users/' + JSON.parse(localStorage.getItem("auth_id"))).once("value")
      .then( (snapshot) => {   
              setFirstName(snapshot.val().Firstname);
              setLastName(snapshot.child("Lastname").val());
              setEmail(snapshot.child("Email").val());
          }).catch((error) =>{
                console.log(error)
          })

  }, [])


  return (
    <div>
      <CssBaseline />
      <NavBar />
      <Grid container justify="center" className={classes.grid}>

        {/* Column 1: This will handle profile image and user name */}
        <Grid xs={12} sm={10} container item className={classes.gridChild1a}> 
          <Grid item color="primary" className={classes.gridChild2}>
            <div className={classes.userProfileEdit}>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <Avatar src={dp} className={classes.avatar}>
                    <Typography variant="h2">?</Typography>
                  </Avatar>
                </IconButton>
              </label>
            </div>

            <Grid item>
              <Typography variant="h5" className={classes.userName}>
              Welcome, { firstName }!  
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Column 2: This will handle all the editable features */}
        <Grid xs={12} sm={10} container item className={classes.gridChild1b}>
          <Grid item className={classes.gridChild2}>
              <div className={classes.textfields}>
                <TextField
                    id="outlined-disabled"
                    label="First Name"
                    value={firstName}
                    variant="outlined"
                    disabled
                    style={{ width: '300px'}}
                  />
              </div>
              <div className={classes.textfields}>
                <TextField
                    id="outlined-disabled"
                    label="Last Name"
                    value={lastName}
                    variant="outlined"
                    disabled
                    style={{ width: '300px'}}
                  />
              </div>
              <div className={classes.textfields}>
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Email"
                    value={email}
                    variant="outlined"
                    style={{ width: '300px'}}
                  />
              </div>
          </Grid>
        </Grid>
      </Grid>
      
    </div>
  );
}

export default Profile;
