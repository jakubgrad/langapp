import React from 'react';
import {Item} from '../Components/Item';

export const Card = ({ data, onDelete }) => {
    
    const handleDelete = (name) => {
        onDelete(name);
    }

    return(
        <>
        <table><tbody>
        {data.map(contact => {
            return(
                <tr key={contact.name}>
                    <th>
                    {/*<button onClick={() => handleDelete(contact.name)}> x </button> deleting words*/}
                    </th>
                    <th>searched word:{contact.word}<Item value={contact.name} /></th>
                </tr>
            )
        })}
        </tbody></table>
        </>
    ) 
}