import React from 'react'
import { 
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse}
from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  mainList:{
    backgroundColor: 'lightgrey'
  },
  ListContent:{
      backgroundColor: 'rgb(238, 238, 238)'
  },
}))


function FAQList({items, faqList, setFaqList}) {
    
    const classes = useStyle();
    const expandHandler = () =>{
           setFaqList(faqList.map(i => {
            if(items.key === i.key){
                return{
                    ...i,
                    expand: !items.expand
                }
            }
            return i;
        }));
    };
    return (
        <>
        <List>
          <ListItem button className={classes.mainList} onClick={expandHandler}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={items.question} />
            {items.expand ? <ExpandLess/> : <ExpandMore />}
          </ListItem>
        </List>

        <Collapse in={items.expand}>
            <List component="div" disablePadding>
                <ListItem button className={classes.ListContent}>
                    <ListItemText>
                        <h2>{items.subHeading}</h2>
                        <p>{items.answer}</p>
                    </ListItemText>
                </ListItem>
            </List>
        </Collapse>   
        </>
    )
}

export default FAQList
