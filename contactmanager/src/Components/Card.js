import React from 'react';
import {Item} from '../Components/Item';

export const Card = ({ listOfContacts, onDelete }) => {
    
    const handleDelete = (name) => {
        onDelete(name);
    }

    return(
        <>
        <table><tbody>
        {listOfContacts.map(contact => {
            return(
                <tr key={contact.name}>
                    <th>
                    <button onClick={() => handleDelete(contact.name)}> x </button></th>
                    <th>searched word:{contact.word}<Item value={contact.name} /></th>
                </tr>
            )
        })}
        </tbody></table>
        </>
    ) 
}