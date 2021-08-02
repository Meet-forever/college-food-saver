import React from "react";
import NavBar from "./Navbar";
import {
  CssBaseline,
  Typography,
  Avatar,
  Grid,
  makeStyles,
  Button,
  FormControl,
  InputLabel,
  FilledInput,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

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
    marginBottom: "10px",
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
  const [name, setName] = React.useState("User Name");
  const [phoneNum, setPhoneNum] = React.useState("1234567890");
  const [email, setEmail] = React.useState("googlemail123@gmail.com");
  const [password, setPassword] = React.useState("");
  const nameHandleChange = (event) => {
    setName(event.target.value);
  };

  const phoneNumHandleChange = (event) => {
    setPhoneNum(event.target.value);
  };
  const emailHandleChange = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandleChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <CssBaseline />
      <NavBar />
      <Grid container justify="center" className={classes.grid}>
        {/*
                Column 1: This will handle profile image and user name 
                */}
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
                  <Avatar src="" className={classes.avatar}>
                    <Typography variant="h2">U</Typography>
                  </Avatar>
                </IconButton>
              </label>
            </div>

            <Grid item>
              <Typography variant="h5" className={classes.userName}>
                User's Name
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/*
                Column 2: This will handle all the editable features 
                */}
        <Grid xs={12} sm={10} container item className={classes.gridChild1b}>
          <Grid item className={classes.gridChild2}>
            <form noValidate autoComplete="off">
              <div className={classes.textfields}>
                <FormControl variant="filled" className={classes.formcontrol}>
                  <InputLabel htmlFor="component-filled">Name</InputLabel>
                  <FilledInput
                    id="component-filled"
                    value={name}
                    onChange={nameHandleChange}
                  />
                </FormControl>
              </div>
              <div className={classes.textfields}>
                <FormControl variant="filled" className={classes.formcontrol}>
                  <InputLabel htmlFor="component-filled">
                    Phone Number
                  </InputLabel>
                  <FilledInput
                    id="component-filled"
                    value={phoneNum}
                    onChange={phoneNumHandleChange}
                  />
                </FormControl>
              </div>
              <div className={classes.textfields}>
                <FormControl variant="filled" className={classes.formcontrol}>
                  <InputLabel htmlFor="component-filled">Email</InputLabel>
                  <FilledInput
                    id="component-filled"
                    value={email}
                    onChange={emailHandleChange}
                  />
                </FormControl>
              </div>
              <div className={classes.textfields}>
                <FormControl variant="filled" className={classes.formcontrol}>
                  <InputLabel htmlFor="component-filled">Password</InputLabel>
                  <FilledInput
                    id="component-filled"
                    type="password"
                    value={password}
                    onChange={passwordHandleChange}
                  />
                </FormControl>
              </div>
            </form>
            <Button variant="contained" color="primary">
              <EditIcon fontSize="small" /> Update
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
