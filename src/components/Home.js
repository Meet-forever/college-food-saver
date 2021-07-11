import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ReactEcharts from "echarts-for-react";
import Box from '@material-ui/core/Box';
import NavBar from './Navbar'
import { getItems } from "../Api.js"
import LinearProgress from '@material-ui/core/LinearProgress';


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
  
const [ totalOrders, setTotalOrders ] = useState(0)
const [ loading, setLoading ] = useState(false);

const classes = useStyles()
var base = +new Date(1968, 9, 3);
var oneDay = 24 * 3600 * 1000;
var date = [];

var data = [Math.random() * 300];

for (var i = 1; i < 20000; i++) {
    var now = new Date(base += oneDay);
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
}

useEffect(() => {
    setLoading(true)
    const fetchItems = async () => {
    const newItems = await getItems()
    setTotalOrders(newItems.length)
    setLoading(false)
    }
    fetchItems()
    
}, [])

  
  return (
    <div>
      <NavBar />
      <div className={classes.root}>
      <Grid container  direction="row" justify="center" alignItems="center">
        <Grid item xs={5}>
          <Box mt={10}>
          <h1>Weekly Insights</h1>
          <ReactEcharts
            option = {{
              tooltip: {
                  trigger: 'item'
              },
              legend: {
                   orient: 'vertical',
                   left: 'left',
                   
              },
              series: [
                  {
                      name: 'Insights',
                      type: 'pie',
                      radius: ['40%', '100%'],
                      avoidLabelOverlap: false,
                      itemStyle: {
                          borderRadius: 10,
                          borderColor: '#fff',
                          borderWidth: 2
                      },
                      label: {
                          show: false,
                          position: 'center'
                      },
                      emphasis: {
                          label: {
                              show: true,
                              fontSize: '13',
                              fontWeight: 'bold'
                          }
                      },
                      labelLine: {
                          show: false
                      },
                      data: [
                          {value: 1048, name: 'Total Food Saved'},
                          {value: 735, name: 'Total Served this week'},
                          {value: 580, name: 'Environmental Impact'},
                          {value: 484, name: 'Items to be Listed'},
                      ]
                  }
              ]
          }}
          />
      </Box>
        </Grid>
        <Grid item xs={4}>
          <h1>Total Orders</h1>
          <Box  border={1} borderRadius={5} p={10}>
          <h1>{ loading ? <LinearProgress /> :totalOrders}</h1>
          </Box>
        </Grid>
        <Grid item xs={9} style = {{ marginTop: '20px'}}>
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