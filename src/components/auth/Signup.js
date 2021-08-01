import React, { useRef, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon   from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import coverImg from '../assets/signupcover.jpeg'
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import firebase from "firebase/app"
// import { AuthContext } from '../../context/AuthContext';



const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${coverImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: '1000px 780px',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));



function Signup() {

  const classes = useStyles();
  const emailRef = useRef()
  const passwordRef = useRef()
  // const passwordConfirmRef = useRef()
  const history = useHistory()
  const [ loginStatus, setLoginStatus ] = useState({})
  const [open, setOpen] = useState(false);
  // const { currentUser } = useContext(AuthContext);
  // const [ user, setUser ] = currentUser

  async function handleSubmit(e) {
    e.preventDefault()

    // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //   return setError("Passwords do not match")
    // }

    firebase.auth().createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
    .then((userCredential) => {
      setOpen(true);
      // Signed up 
      const user = userCredential.user;
      localStorage.setItem('user_id',JSON.stringify(user.uid));
      setLoginStatus({ msg: "Signing Up.....", authSuccess: "yes" })
    })
    .then(() => {
        setTimeout(() => {
            setOpen(false);
            history.push("/")
        }, 3000)
    })
    .catch((error) => {
      const errorMessage = error.message;
      setLoginStatus({ msg: errorMessage,  authSuccess: "no" })

    });
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            { loginStatus.authSuccess === "yes" && <Alert severity="success"> { loginStatus.msg }</Alert> }
            { loginStatus.authSuccess === "no" && <Alert severity="error"> { loginStatus.msg }</Alert> }

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={emailRef} 
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={passwordRef} 
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {loginStatus.authSuccess === "yes"  ? <CircularProgress color="secondary"/>  : "Sign Up" }
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <span>Already have an account ?</span>
                <Link href="/login" variant="body2">
                  {"Login"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
            </Box>
          </form>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}

            // onClose={handleModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
      >

        <Fade in={open}>

        <div className={classes.paper2}>
          <h2 id="transition-modal-title">Signing Up...</h2>
            <div>
              <CircularProgress  /> 
            </div>         
        </div>
        </Fade>
    
      </Modal>
        </div>
      </Grid>
      
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      
    </Grid>    
  );
}

export default Signup