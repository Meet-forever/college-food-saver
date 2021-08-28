import React from "react";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router";
import {
  CssBaseline,
  Box,
  Typography,
  Button,
  Avatar,
  MenuItem,
  Menu
 
} from "@material-ui/core";
import FastfoodIcon from "@material-ui/icons/Fastfood";

const useStyles = makeStyles(theme => ({
  navbar: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    width: "100%",
    padding: "0 5%",
    display: "flex",
    height: "10vh",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "darkblue",
    zIndex: "10",
  },
  header: {
    display: "flex",
    alignItems: "center",
  },
  navBtnContainer: {
    display: "flex",
    alignItems: "center",
  },
  navbtn: {
    margin: "2px",
    padding: "2px",
    fontSize: "clamp(8px, 4vw, 14px)",
  },
  contentContainer:{
    maxWidth: '720px',
    margin: '0 auto',
    padding: '10px'
  },
  summaryBox:{
    padding: '1em',
    backgroundColor: 'lightgrey', 
    outline: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    marginBottom: '5px',
    '&:hover':{
      background: '#dedede',
      fontWeight: '600'
    },
  }
}));

const Faq = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuOpen = e => {
    setAnchorEl(e.currentTarget);
  }
  const handleMenuClose = () =>{
    setAnchorEl(null);
  }
  // This will store array of objects to create list and it's key-values
  // In future if we want to add some search bar we can use below object as a json file to search data
  const faqList = React.useRef([
    {
      question: "You have Question1? We have answer!",
      subHeading: "Sub Heading",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      key: Math.random()*100,
    },
    {
      question: "You have Question2? We have answer!",
      subHeading: "Sub Heading",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      key: Math.random()*100,
    },
    {
      question: "You have Question3? We have answer!",
      subHeading: "Sub Heading",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      key: Math.random()*100,
    },
    {
      question: "You have Question4? We have answer!",
      subHeading: "Sub Heading",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      key: Math.random()*100,
    },
    {
      question: "You have Question5? We have answer!",
      subHeading: "Sub Heading",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      key: Math.random()*100,
    },
    {
      question: "You have Question6? We have answer!",
      subHeading: "Sub Heading",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      key: Math.random()*100,
    },
    {
      question: "You have Question7? We have answer!",
      subHeading: "Sub Heading",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      key: Math.random()*100,
    },
    {
      question: "You have Question8? We have answer!",
      subHeading: "Sub Heading",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      key: Math.random()*100,
    },
    {
      question: "You have Question9? We have answer!",
      subHeading: "Sub Heading",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      key: Math.random()*100,
    },
    {
      question: "You have Question10? We have answer!",
      subHeading: "Sub Heading",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      key: Math.random()*100,
    },
  ]);
  const history = useHistory();
  const signUpHandler = () => {
    history.push("./signup");
  };
  const expandAllHandler = () =>{
      let details = document.getElementsByTagName('details')
      for(let i = 0 ; i < 10 ; i++){
        details[i].setAttribute('open', true)
      }    
    }
  const collapseAllHandler = () =>{
    let details = document.getElementsByTagName('details')
    for(let i = 0 ; i < 10 ; i++){
      details[i].removeAttribute('open')
    }    
  }
  const homeHandler = () => {
    history.push('./home');
}

  return (
    <div>
      <CssBaseline />
      {/* Nav Bar */}
      <Box className={classes.navbar}>
        <Box component="div" className={classes.header}>
          <Avatar style={{ marginRight: "5px", backgroundColor: "white" }}>
            <FastfoodIcon style={{ fill: "#002884" }} />
          </Avatar>
          <Typography
            variant="h5"
            onClick={homeHandler}
            style={{
              fontWeight: "500px",
              color: "white",
              fontSize: "clamp(20px, 5vw, 32px)",
              cursor: 'pointer'
            }}>
            Save Food
          </Typography>
        </Box>
        <Button
          aria-controls="join-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick = {handleMenuOpen}
          style={{backgroundColor: '#f50057', fontWeight: '400'}}
        >
        Join Us
      </Button>
      <Menu 
        id='join-menu'
        anchorEl={anchorEl}
        open ={Boolean(anchorEl)}
        onClose={handleMenuClose}
        keepMounted
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={signUpHandler}>As a Client</MenuItem>
        <MenuItem onClick={signUpHandler}>As a Student</MenuItem>
      </Menu>
      </Box>
      {/* "Fake area", which will hide behind the nav bar. This is used to indent the container */}
      <div style={{height: '14vh'}}></div>
      {/* Main Content Page */}
      <Box component="div" className={classes.contentContainer}>
          {/* Heading */}
        <Typography
          variant="h4">
          FAQ's to make life just simpler
        </Typography>
        <div style={{margin: '10px 0'}}>
          <span>
            <Button onClick={expandAllHandler}>Expand All</Button>
            <Button onClick={collapseAllHandler}>Collapse All</Button> 
          </span>
        </div>
          {/* FAQ list starts */}
          {faqList.current.map(i => {
              return(
                <details key={i.key}>
                <summary className={classes.summaryBox}>{i.question}</summary>
                <div style={{textAlign: 'left', padding: '5px 10px'}}>
                  <h2>{i.subHeading}</h2>
                  <p>{i.answer}</p>
                </div>
              </details>
          )
          })}
          
      </Box>
    </div>
  );
};

export default Faq;
