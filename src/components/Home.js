import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ReactEcharts from "echarts-for-react";
import Box from '@material-ui/core/Box';
import NavBar from './Navbar'
import { getItems } from "../Api.js"
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
   root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function Home() {
 
const [ totalOrders, setTotalOrders ] = useState(100)
const [ loading, setLoading ] = useState(false);
const classes = useStyles()


// Dummy Data

var date = [];
var data = [Math.random() * 300];
date.push([new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join('/'));
data.push(Math.round((Math.random() - 0.5) * 20));

// var base = new Date(1968, 9, 3);
// var oneDay = 24 * 3600 * 1000;
// for (var i = 1; i < 20000; i++) {
//     var now = new Date(base += oneDay);
//     date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
//     data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
// } 


useEffect(() => {
    setLoading(true)
    const fetchItems = async () => {
    const newItems = await getItems()
    setTotalOrders(newItems.filter(item => item.requested === true).length)
    setLoading(false)
    }
    fetchItems()
    
}, [])



  
  return (
      <div>
      <NavBar />

      <div className={classes.root}>
        
      <Grid container  direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={11} md={5}>
          <Box mt={10}>
          <Typography variant="h4">
            Weekly Insights
          </Typography>
          <ReactEcharts
             
             option = {{              
              tooltip: {
                  trigger: 'item'
              },
              series: [
                  {
                      name: 'Insights',
                      type: 'pie',
                      radius: '85%',
                      data: [
                          {value: 1048, name: 'Food \n Saved'},
                          {value: 735, name: 'This week count'},
                          {value: 484, name: 'New \n Items'},
                          {value: 580, name: 'Environmental \n Impact'},
                      ],
                      emphasis: {
                          itemStyle: {
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      }
                  }
              ]
          }} 
          
          />
      </Box>
        </Grid>
        <Grid item xs={7} sm={6} md={3} style={{ marginTop: '42px'}}>
          <Typography variant="h4">
              Orders
          </Typography>
          <Box  border={1} borderRadius={5} p={10} mt={2}>
            <h1>{ loading ? <LinearProgress /> :totalOrders}</h1>
          </Box>
        </Grid>
        <Grid item xs={9} style = {{ marginTop: '40px'}}>
          <ReactEcharts
            option = {{
              tooltip: {
                  trigger: 'axis',
                  position: function (pt) {
                      return [pt[0], '10%'];
                  }
              },
              title: {
                  left: 'center',
                  text: 'Total Food Save Over An Year',
                  textStyle:{
                    fontSize: 14
                  }
              },
              toolbox: {
                  feature: {
                      dataZoom: {
                          yAxisIndex: 'none'
                      },
                      restore: {},
                      saveAsImage: {}
                  }
              },
              xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: date
              },
              yAxis: {
                  type: 'value',
                  boundaryGap: [0, '100%']
              },
              dataZoom: [{
                  type: 'inside',
                  start: 0,
                  end: 10
              }, {
                  start: 0,
                  end: 10
              }],
              series: [
                  {
                    name: 'Total Food Save Over An Year',
                    type: 'line',
                    symbol: 'none',
                    sampling: 'lttb',
                    itemStyle: {
                        color: 'rgb(255, 70, 131)'
                    },
                    areaStyle: {
                        color: 'blue'
                    },
                    data: data
                  }
              ]
          }}
          />
        </Grid>
      </Grid>
    </div>
    </div>

  );
}

export default Home;