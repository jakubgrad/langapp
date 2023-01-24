import React from 'react';
import parse from 'html-react-parser'

export const Selector = ({ data, selected, onDelete }) => {

    const handleDelete = (name) => {
        onDelete(name);
    }

    return (
        <div>
            <table><tbody>
                {data.map(contact => {
                    if (contact.word == selected) {
                        return (
                            <tr key={contact.name}>
                                <th>
                                    {/*<button onClick={() => handleDelete(contact.name)}> x </button> for now unnecessary*/}
                                </th>
                                <th>{contact.word} {parse(contact.name)} </th>
                            </tr>

                        )
                    }
                })}
            </tbody></table>
                        </div>
            ) 
}