import React, { useState } from 'react'
import NavBar from './Navbar'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createItem } from "../Api.js";
import { useHistory } from "react-router-dom";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";



const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    },
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    input: {
        display: "none"
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    },
}));

const Add = () => {
    const classes = useStyles();

    const history = useHistory();

    const [ itemName, setItemName ] = useState("");
    const [ itemDescription, setItemDescription ] = useState("");
    const [ expiryDate, setExpiryDate ] = useState(new Date().toISOString());

    const [ calories, setCalories ] = useState(0)
    const [ fats, setFats ] = useState(0)
    const [ carbs, setCarbs ] = useState(0)
    const [ protiens, setProtiens ] = useState(0)

    const submitHandler = async (e) => {
        e.preventDefault();
        const obj = {title: itemName, description: itemDescription, date: expiryDate, calories: calories, fats: fats, carbs: carbs, protiens: protiens,
        requested: false, r_accepted: false}
        await createItem(obj)
        history.push('/list')
    }

    const handleItemNameChange = (e) => {
        setItemName(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        setItemDescription(e.target.value)
    }

    const handleDateTimePickerChange = (e) => {
        setExpiryDate(e.target.value)
    }

    const handleCaloriesChange = (e) => {
        setCalories(e.target.value)
    }

    const handleFatsChange = (e) => {
        setFats(e.target.value)
    }

    const handleCarbsChange = (e) => {
        setCarbs(e.target.value)
    }

    const handleProtiensChange = (e) => {
        setProtiens(e.target.value)
    }


    return (
        <div>
            <NavBar/>
            <Container maxWidth="lg">
                <form className={classes.root} noValidate autoComplete="off" onSubmit={submitHandler}>
                <Typography variant="h4" component="h4" style= {{ marginTop: '60px', marginBottom: '20px' }}>
                    Add Item
                </Typography>

                <div>
                <TextField required id="standard-required" label="Item Name"  onChange={handleItemNameChange} value={itemName}
                variant="outlined"/>
                </div>
                <div>
                <TextField
                    id="standard-multiline-static"
                    label="Description"
                    multiline
                    rows={2}
                    value={itemDescription}
                    defaultValue=""
                    required
                    variant="outlined"
                    onChange={handleDescriptionChange}
                />
                </div>
                <div>
                 <TextField
                    id="datetime-local"
                    label="Expiry Date"
                    type="datetime-local"
                    defaultValue=""
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    required
                    variant="outlined"
                    onChange={handleDateTimePickerChange}
                />
                </div>
                <div>
                    <TextField
                    id="calories"
                    label="Calories"
                    type="number"
                    variant="outlined"
                    onChange={handleCaloriesChange}
                    />
                    <TextField
                    id="fat"
                    label="Fat (g)"
                    type="number"
                    variant="outlined"  
                    onChange={handleFatsChange}
                    />
                </div>
                <div>
                    <TextField
                    id="carbs"
                    label="Carbs (g)"
                    type="number"
                    variant="outlined"
                    onChange={handleCarbsChange}

                    />
                    <TextField
                    id="protiens"
                    label="Protein (g)"
                    type="number"
                    variant="outlined"
                    onChange={handleProtiensChange}
                    />
                </div>
                
                <div style = {{ marginTop: '40px'}}>
                <Button variant="contained" color="secondary" type="submit">Add</Button>
                </div>
                </form>
            </Container>
        </div>
    )
}

export default Add
