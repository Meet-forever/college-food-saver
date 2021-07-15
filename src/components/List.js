import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Box from '@material-ui/core/Box';
import { Container } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { useHistory, Link } from "react-router-dom";
import NavBar from './Navbar'
import Signup from './assets/signup.jpg'
import { getItems } from "../Api.js"
import CreateIcon from '@material-ui/icons/Create';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CancelIcon from '@material-ui/icons/Cancel';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170, align: 'center'  },
  { id: 'description', label: 'Description', minWidth: 120, align: 'center'  },
  { id: 'calories', label: 'Calories', minWidth: 60, align: 'center'  },
  { id: 'fat', label: 'Fat (g)', minWidth: 60, align: 'center'  },
  { id: 'carbs', label: 'Carbs (g)', minWidth: 60, align: 'center'  },
  { id: 'protein', label: 'Protein (g)', minWidth: 60, align: 'center'  },
  { id: 'date', label: 'Expiry Date', minWidth: 100, align: 'center' },

];

function createData(name, description, calories, fat, carbs, protein, date) {
  return { name, description, calories, fat, carbs, protein, date };
}



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    maxHeight: 440,
  },
  rootList: {
      width: '100%',
  }
}));

function List() {
  const classes = useStyles();
  const [ loading, setLoading ] = useState(false);
  const [view, setView] = React.useState('module');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [items, setItems] = useState([])
  const [ imgCounter, setImgCounter ] = useState(0)

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // add this function to clean in useEffect
  const onImageLoad = () => {
   setImgCounter ( imgCounter + 1)
   console.log(`Img Counter: ${imgCounter} Items: ${items.length}`)
   if( imgCounter >= items.length){
     setLoading(false)
   }
  }

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true)
      const newItems = await getItems()
      setItems(newItems)
      setLoading(false)

    }
    fetchItems()
  }, [])

  const rows = [];

  items.filter(filteredItems => filteredItems.r_accepted === false ).map(item => ( 
    rows.push(createData(item.title , item.description, item.calories, item.fats, item.carbs, item.protiens, new Date(item.date).toString()))
  ))    

  const history = useHistory()
  const handleAddClick = () =>{
    history.push('/add')
  }

  const handleDelete = () => {
    history.push('/delete')
  }

  return (
    <div>
            <NavBar />
            <div style={{ marginTop: '50px', marginBottom: '50px' }}>
            <ToggleButtonGroup orientation="horizontal" value={view} exclusive onChange={handleChange}>
            <ToggleButton value="list" aria-label="list">
                <ViewListIcon />
            </ToggleButton>
            <ToggleButton value="module" aria-label="module">
                <ViewModuleIcon />
            </ToggleButton> 
           </ToggleButtonGroup>
           </div>
           
    
    <div className={classes.root} >
    {view === 'module' ?  
    
    // module view
    <Container maxWidth="lg" >
    {loading ? <CircularProgress /> : 
      <Grid container spacing={2}>
        {
              items.filter(filteredItems => filteredItems.r_accepted === false ).map(item => (
              <Grid item xs={6} sm={3} key={item._id}>
                <Card className={classes.root}>
                  <CardActionArea>
                      <CardMedia
                      className={classes.media}
                      component="img"
                      image={Signup}
                      title="Contemplative Reptile"
                      onLoad={onImageLoad}
                      />
                      <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {item.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {item.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions disableSpacing> 
                      <IconButton size="small" color="primary">
                        <AccessAlarmIcon />
                        {new Date(item.date).toLocaleDateString()} { new Date(item.date).toLocaleTimeString()}
                      </IconButton>

                      { item.requested ? <IconButton size="small" color="primary" style={{marginLeft: "auto"}}> <CheckBoxIcon style={{ fill: 'green',marginLeft: "auto"}} /> </IconButton> :
                      <IconButton size="small" color="primary" style={{marginLeft: "auto"}}>
                        <CreateIcon />
                      </IconButton>
                      }
                       { item.requested ? <IconButton size="small" color="primary"> <CancelIcon style={{ fill: 'red'}} /> </IconButton>  :
                      <Link to={`/delete/${item._id}`}size="small" color="primary" onClick={handleDelete}>
                        <DeleteIcon />
                      </Link>
                      }
                      
                    </CardActions>
                </Card>
              </Grid>
              ))
              
        }
        <Grid item xs={6} sm={3}>
          <Box  border={1} borderRadius={5} p={7.5} borderColor="grey.400">
            <IconButton onClick={handleAddClick}>
            <AddBoxIcon fontSize='large'/>
            </IconButton>
          </Box>
        </Grid>
        </Grid>
      }
      </Container>: 
      
      // list view
      <Container maxWidth="lg">
      <Paper className={classes.rootList}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    </Container>
    }
    </div>
    </div>

  );
}


export default List