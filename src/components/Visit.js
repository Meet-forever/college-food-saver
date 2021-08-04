import React from 'react'
import NavBar from "./Navbar"
import { CssBaseline, Grid, makeStyles, Box, Container, Button, TextField} from '@material-ui/core'
import food from './assets/food.png';
import food2 from './assets/food2.png';
import food3 from './assets/food3.png';
import food4 from './assets/food4.png';

const useStyle = makeStyles(theme => ({
    root:{
        minHeight: '100vh'
    },
    innercol:{
        backgroundColor: 'tomato'
    },
    box:{
        width: '100%',
        height: '300px',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    boxText:{
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
        padding: '0 30px 0 30px'
    },
    PhotoContain:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '300px'
    },
    footer:{
        backgroundColor: 'blue',
        marginTop: '30px'
    },
    footerBox1:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        color: 'white',
        padding: '10px',
        flexDirection: 'column'
    },
    footerBox2:{
        display: 'flex',
        justifyContent: 'center',
        height: '300px',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '10px'
    },
    textfield:{
        backgroundColor: 'white',
        margin: '10px'
    },
    textfieldmessage:{
        width: '400px',
        backgroundColor: 'white',
        marginBottom: '10px'
    }
}))


export default function Visit() {
    
    const classes = useStyle();

    return (
        <div>
            <Box variant="div" className={classes.root}>
            <CssBaseline />
            <NavBar style={{position: 'absolute'}}/>
            <Container fixed >
                    <Grid container direction="column">
                        <Grid item container>    
                                <Grid item md={6} sm={12} xs={12}>
                                    <Box variant="div" className={classes.box}>
                                        <Box variant="div" className={classes.boxText} >
                                            <h1>Who we are?</h1>
                                            <p>We are Non-profit Organization with ambition to reduce food wastage. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Dui </p>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid items  md={6} sm={12} xs={12} >
                                    <Box variant="div" className={classes.box}>
                                        <img  alt="People Donating things" src={food} className={classes.PhotoContain}/>
                                        <a href="http://www.freepik.com">Designed by pch.vector / Freepik</a>
                                    </Box>
                                </Grid>
                        </Grid>
                        <Grid item container direction="row-reverse">    
                                <Grid item md={6} sm={12} xs={12}>
                                    <Box variant="div" className={classes.box}>
                                        <Box variant="div" className={classes.boxText} >
                                            <h1>How your donation going to Help?</h1>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Dui </p>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid items  md={6} sm={12} xs={12} >
                                    <Box variant="div" className={classes.box}>
                                        <img alt="Donation Bag" src={food2} className={classes.PhotoContain}/>
                                        <a href="http://www.freepik.com">Designed by pch.vector / Freepik</a>
                                    </Box>
                                </Grid>
                        </Grid>
                        <Grid item container>    
                                <Grid item md={6} sm={12} xs={12}>
                                    <Box variant="div" className={classes.box}>
                                        <Box variant="div" className={classes.boxText} >
                                            <h1>Become A Donator!</h1>
                                            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                                                <Button variant="contained" color="primary">Sign UP</Button>
                                                <Button variant="contained" color="secondary">Login</Button>
                                            </div>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid items  md={6} sm={12} xs={12} >
                                    <Box variant="div" className={classes.box}>
                                        <img alt="join Us" src={food3} className={classes.PhotoContain}/>
                                        <a  href="http://www.freepik.com">Designed by pch.vector / Freepik</a>
                                    </Box>
                                </Grid>
                        </Grid>
                        <Grid item container direction="row-reverse">    
                                <Grid item md={6} sm={12} xs={12}>
                                    <Box variant="div" className={classes.box}>
                                        <Box variant="div" className={classes.boxText} >
                                            <h1>Security</h1>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Dui </p>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid items  md={6} sm={12} xs={12} >
                                    <Box variant="div" alt="Security" className={classes.box}>
                                        <img src={food4} alt="security assurance" className={classes.PhotoContain}/>
                                        <a href='https://www.freepik.com/vectors/clouds'>Clouds vector created by vectorjuice - www.freepik.com</a>
                                    </Box>
                                </Grid>
                        </Grid>
                    </Grid>
            </Container>
        <Grid container md={12} sm={12} xs={12} className={classes.footer}>
                <Grid item  md={6} sm={12} xs={12}>
                    <div className={classes.footerBox1}>
                        <h1>Save Food</h1>
                        <p>And say Good Bye to Waste</p>
                    </div>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <div className={classes.footerBox2}>
                        <TextField
                        label='Email'
                        variant='filled'
                        className={classes.textfield}
                        />
                        <TextField
                        label='message us'
                        multiline
                        rows={5}
                        variant='filled'
                        className={classes.textfield, classes.textfieldmessage}
                        />
                        <div>
                            <Button variant='contained'>Submit</Button>
                        </div>
                    </div>
                </Grid>
        </Grid>
        </Box>
        </div>
    )
}


