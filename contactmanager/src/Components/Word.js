import React from 'react';


export const Word = ( {value, onFormChange, onFormSubmit, data} ) => {

    const handleChange = () => {
        onFormChange(value);
    }
    const handleSubmit = () => {
        onFormChange(value);
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
    return <span  onClick={handleSubmit} style={{paddingLeft:1,paddingRight:1, margin:0,backgroundColor: "lavender", border: '0px solid black'}}>{value}</span>
}