import React from 'react';


export const Word = ( {value, onFormChange, onFormSubmit, listOfContacts} ) => {
    //console.log("prop from word file: " + value)
    const handleChange = () => {
        //console.log("pointed " + value);
        onFormChange(value);
    }
    const handleSubmit = () => {
        let flag = false
        listOfContacts.map(contact => {
            if (contact.word == value) {
                console.log("found a double");
                flag = true
            }
        })
        if(flag == false) {
            onFormSubmit()
        }
        
    }
    return <span onMouseOver={handleChange} onClick={handleSubmit} style={{backgroundColor: "lavender", border: '1px solid black',borderRadius: '5px'}}>{value}</span>
}