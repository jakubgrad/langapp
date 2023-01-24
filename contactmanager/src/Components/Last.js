import React from 'react';
import {Item} from '../Components/Item';

export const Last = ({ data, onDelete }) => {
    const handleDelete = (name) => {
        onDelete(name);
    }
    var lastword =  "No last wordd"
    if(data.length==0) {
        lastword = "No last word"
    } else {
        lastword = data[data.length-1].name;
        //console.log(lastword);
    }

    return(
        <>
        <Item value={lastword} />
        </>
    ) 
}