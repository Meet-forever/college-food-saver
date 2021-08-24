import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Box from '@material-ui/core/Box';
import { Container } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
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
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { deleteItem } from '../Api'

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
  container: {
    maxHeight: 440,
  },
  rootList: {
      width: '100%',
  },
  media: {
    height: 180,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '13px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function List() {
  const classes = useStyles();
  const [ loading, setLoading ] = useState(false);
  const [view, setView] = React.useState('module');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [items, setItems] = useState([])
  const [ deleteOrderLoading, setDeleteOrderLoading ] = useState(false);
  const [open, setOpen] = useState(false);
  const [ itemModalId, setItemModalId] = useState(0)
  const [ onItemUpdate, setOnItemUpdate ] = useState(false)

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  const handleModalOpen = (id) => {
    setItemModalId(id)
    setOpen(true);
  };

  const handleModalClose = (id, requested) => {
    setOpen(false);
  };

  const handleModalAction = async () => {
    setDeleteOrderLoading(true)
    await deleteItem(itemModalId)
    setTimeout(() => {    setOpen(false) } , 200)
    setTimeout(() => { setDeleteOrderLoading(false) }, 350)
    setOnItemUpdate(!onItemUpdate)
  }

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true)
      const newItems = await getItems()
      setItems(newItems)
      setLoading(false)
    }
    fetchItems()
  }, [onItemUpdate])

  const rows = [];

  items.filter(filteredItems => filteredItems.r_accepted === false ).map(item => ( 
    rows.push(createData(item.title , item.description, item.calories, item.fats, item.carbs, item.protiens, new Date(item.date).toString()))
  ))    

  return (
    <div>
      <NavBar />
        <Container style={{ marginTop: '30px', marginBottom: '20px'}} >
            <Box p={3} style= {{ marginBottom: '20px', border: '1px solid lightgrey', borderRadius:'5px'  }} >
              <Typography variant="h4" >
                  Orders
              </Typography>
            </Box>
        </Container>
           
    <div className={classes.root} >
      
      
      <Container maxWidth="lg" >
      {loading ? <CircularProgress /> : 
        <Grid container spacing={2}>
          {
                items.filter(filteredItems => filteredItems.requested === true ).map(item => (
                <Grid item xs={12} md={12} sm={12} key={item._id}>
                  <Card className={classes.root} >
                    <CardActionArea>
                        <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                              <Typography gutterBottom variant="h5" component="h2">
                                  {item.title}
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                  {item.description}
                              </Typography>
                        </CardContent>

                        <CardActions> 
                          <AccessAlarmIcon style= {{ marginRight: '6px', fill: 'darkred'}} />
                          <Typography variant="body1" style={{ color:'darkRed' }} >
                          {new Date(item.date).toLocaleDateString()} { new Date(item.date).toLocaleTimeString()}
                          </Typography>

                        { item.requested ? <CheckBoxIcon style={{ fill: 'green',marginLeft: "auto"}} />  :
                        <IconButton size="small" color="primary" style={{marginLeft: "auto"}}>
                          <CreateIcon style={{ fill: 'green' }} />
                        </IconButton>
                        }
                        { item.requested ? <CancelIcon style={{ fill: 'red'}} />  :

                        <IconButton size="small" color="primary" onClick={ () => { handleModalOpen(item._id) } }>
                          <DeleteIcon style={{ fill: 'red' }} />                      
                        </IconButton>
                        }
                        
                      </CardActions>
                    </CardActionArea>
                  </Card>
                </Grid>
                ))
          }
          </Grid>
        }
        </Container>
        


      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >

        <Fade in={open}>
        {  deleteOrderLoading ? 
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Deleting Item....</h2>
            <div>
              <CircularProgress style= {{ marginLeft: '90px'}} /> 
            </div>         
        </div>
        : 
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Delete Item ?</h2>
            <div>
            <IconButton size="small" color="primary" style={{ marginLeft:'36px' }} onClick={handleModalAction}>
                <CheckCircleIcon style={{ fill: 'green'}}  fontSize="large"/>
            </IconButton>
            <IconButton size="small" color="primary" onClick={handleModalClose} >
                <CancelIcon style={{ fill: 'red' }}  fontSize="large" />
            </IconButton>
            </div>
          </div>
        }
        </Fade>
    
      </Modal>
      </div>
    </div>

  );
}

export default List