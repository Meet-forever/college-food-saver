import React, { useState } from 'react'
import NavBar from './Navbar'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createItem } from "../Api.js";
import { useHistory } from "react-router-dom";
import { app } from "../firebase.js"
import firebase from 'firebase'
    


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
  input: {
        display: 'none',
  },
}));

const db = app.firestore()
const storage = app.storage()

var imageURL = "test";


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
    const [ file, setFile] = useState(null)

    const submitHandler = async (e) => {
        e.preventDefault();

        const storageRef = storage.ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)

        db.collection("itemImages").doc("ShrxjbmoybsOhYTeVkNZ").update({
          images: firebase.firestore.FieldValue.arrayUnion({
            name: file.name,
            url: await fileRef.getDownloadURL()
          })
        })


        // db.collection("itemImages")
        // .doc("ShrxjbmoybsOhYTeVkNZ")
        // .onSnapshot((doc) => {
        //         imageURL = JSON.stringify( doc.data().images[ doc.data().images.length - 1 ].url)
        //         console.log(" Image URl -> " + imageURL)

        // });
        var itemObj 

        db.collection("itemImages").doc("ShrxjbmoybsOhYTeVkNZ").get()
        .then((doc) => {
            if (doc.exists) {
                itemObj = {title: itemName, description: itemDescription, date: expiryDate, calories: calories, fats: fats, carbs: carbs, protiens: protiens,
                requested: false, r_accepted: false, itemImageURL: doc.data().images[ doc.data().images.length - 1 ].url }
                
            createItem(itemObj)
            history.push('/list')   

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

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

    const onFileChange = (e) => {
        setFile(e.target.files[0])
      }

    return (
        <div>
            <NavBar/>
            <Container maxWidth="lg">
                <form className={classes.root} onSubmit={submitHandler}>
                <Typography variant="h4" component="h4" style= {{ marginTop: '60px', marginBottom: '20px' }}>
                    Add Item
                </Typography>

                <div>
                <TextField required id="standard-required" label="Item Name"  onChange={handleItemNameChange} value={itemName}
                variant="outlined"/>


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
                    <TextField
                    id="calories"
                    label="Calories"
                    type="number"
                    variant="outlined"
                    onChange={handleCaloriesChange}
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
                    <TextField
                    id="protiens"
                    label="Protein (g)"
                    type="number"
                    variant="outlined"
                    onChange={handleProtiensChange}
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
                </div>

                <div>  
                <label htmlFor="image">Upload Image</label>
				<input type="file" id="image"
					name="image" required onChange={onFileChange} />
     
                </div>
                
                <div style = {{ marginTop: '90px'}}>
                <Button variant="contained" color="secondary" type="submit">Add Item</Button>
                </div>
                </form>
            </Container>
        </div>
    )
}

export default Add
