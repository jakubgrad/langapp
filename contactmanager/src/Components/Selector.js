import React from 'react';
import {Item} from '../Components/Item';
import parse from 'html-react-parser'

export const Selector = ({ listOfContacts, selected, onDelete }) => {
    
    const handleDelete = (name) => {
        onDelete(name);
    }

    return(
        <>
        <table style={{textAlign: "left", backgroundColor: "green"}}><tbody>
        {listOfContacts.map(contact => {
            if(contact.word==selected) {
                return(
                <tr key={contact.name}>
                    <th>
                    <button onClick={() => handleDelete(contact.name)}> x </button></th>
                    <th>{contact.word} {parse(contact.name)} </th>
                </tr>
                
            )
        }
        })}
        </tbody></table>
        </>
    ) 
}