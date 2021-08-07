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
  /*
  * 1) It will handle input text of the user
  * 2) It will check if the user input is valid or not
  * 3) It will change the label based on user's input
  */
  //User Name
  const [name, setName] = React.useState("User Name");
  const [checkName, setCheckName] = React.useState(false);
  const [nameLabel, setNameLabel] = React.useState("Name");
  //Phone Number
  const [phoneNum, setPhoneNum] = React.useState("1234567890");
  const [checkPhone, setCheckPhone] = React.useState(false);
  const [phoneLabel, setPhoneLabel] = React.useState("Phone Number");
  //Email
  const [email, setEmail] = React.useState("googlemail123@gmail.com");
  const [checkEmail, setCheckEmail] = React.useState(false);
  const [emailLabel, setEmailLabel] = React.useState("Email");
  //Password
  const [password, setPassword] = React.useState("");
  const [checkPass, setCheckPass] = React.useState(false);
  const [passLabel, setPassLabel] = React.useState("Password");

  //Get-Set Name
  const nameHandleChange = (event) => {
    setName(event.target.value);
  };
  //Get-Set Phone Number
  const phoneNumHandleChange = (event) => {
    setPhoneNum(event.target.value);
  };
  //Get-Set Email
  const emailHandleChange = (event) => {
    setEmail(event.target.value);
  };
  //Get-Set Password
  const passwordHandleChange = (event) => {
    setPassword(event.target.value);
  };

// Valied Input Checker
  const check = (inputValues) => {
    if(inputValues[0].value.length < 2){
      setNameLabel("User name should greater than 1 character");
      setCheckName(true)
    }
    else{
      setNameLabel("Name")
      setCheckName(false)
    }
    let checkPhonenumber = /[0-9]{10}/;
    if(inputValues[1].value.length !== 10 || !checkPhonenumber.test(inputValues[1].value)){
      setPhoneLabel("Enter a valid phone number!")  
      setCheckPhone(true)   
    }
    else{
      setPhoneLabel("Phone Number")
      setCheckPhone(false)
    }
    let checkEmail = /^[a-z0-9._\-+]+@[a-z]+\.([a-z]{2}\.)?[a-z]{2,3}$/;
    if(!checkEmail.test(inputValues[2].value)){
      setEmailLabel("Enter a valid email.");
      setCheckEmail(true)
    }
    else{
      setEmailLabel("Email")
      setCheckEmail(false)
    }
    if(inputValues[3].value.length < 8){
      setPassLabel("Password should atleast 8 characters")
      setCheckPass(true)
    }
    else{
      setPassLabel("Password")
      setCheckPass(false)
    }
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    let choice = window.confirm('This form will be updated.');
    if(!choice) return;
    const formValue = e.target;
    check(formValue);
    
  }


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
            <form onSubmit={formSubmitHandler} autoComplete="off">
              <div className={classes.textfields}>
                <FormControl variant="filled" required className={classes.formcontrol}>
                  <InputLabel htmlFor="component-filled-name">{nameLabel}</InputLabel>
                  <FilledInput
                    error={checkName}
                    id="component-filled-name"
                    value={name}
                    onChange={nameHandleChange}
                  />
                </FormControl>
              </div>
              <div className={classes.textfields}>
                <FormControl variant="filled" required className={classes.formcontrol}>
                  <InputLabel htmlFor="component-filled-phNo">{phoneLabel}</InputLabel>
                  <FilledInput
                    required
                    error={checkPhone}
                    id="component-filled-phNo"
                    value={phoneNum}
                    onChange={phoneNumHandleChange}
                  />
                </FormControl>
              </div>
              <div className={classes.textfields}>
                <FormControl variant="filled" required className={classes.formcontrol}>
                  <InputLabel htmlFor="component-filled-email">{emailLabel}</InputLabel>
                  <FilledInput
                    required
                    error={checkEmail}
                    id="component-filled-email"
                    value={email}
                    onChange={emailHandleChange}
                  />
                </FormControl>
              </div>
              <div className={classes.textfields}>
                <FormControl variant="filled" required className={classes.formcontrol}>
                  <InputLabel htmlFor="component-filled-password">{passLabel}</InputLabel>
                  <FilledInput
                    required
                    error={checkPass}
                    id="component-filled-password"
                    type="password"
                    value={password}
                    onChange={passwordHandleChange}
                  />
                </FormControl>
              </div>
              <Button variant="contained" color="primary" type="submit">
              <EditIcon fontSize="small" /> Update
            </Button>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
