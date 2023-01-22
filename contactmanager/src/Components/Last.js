import React from 'react';
import {Item} from '../Components/Item';

export const Last = ({ listOfContacts, onDelete }) => {
    const handleDelete = (name) => {
        onDelete(name);
    }
    var lastword =  "No last wordd"
    if(listOfContacts.length==0) {
        lastword = "No last word"
    } else {
        lastword = listOfContacts[listOfContacts.length-1].name;
        //console.log(lastword);
    }

    return(
        <>
        <Item value={lastword} />
        </>
    ) 
}