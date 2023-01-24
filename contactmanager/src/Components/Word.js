import React from 'react';


export const Word = ( {value, onFormChange, onFormSubmit, data} ) => {

    const handleChange = () => {
        onFormChange(value);
    }
    const handleSubmit = () => {
        let flag = false
        data.map(contact => {
            if (contact.word === value) {
                console.log("found a double");
                flag = true
            }
        })
        if(flag === false) {
            onFormSubmit()
        }
        
    }
    return <span onMouseOver={handleChange} onClick={handleSubmit} style={{padding:3, margin:1,backgroundColor: "lavender", border: '1px solid black',borderRadius: '5px'}}>{value}</span>
}