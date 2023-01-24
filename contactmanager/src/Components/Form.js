import React from 'react';

export const Form = ({ userInput, onFormChange, onFormSubmit, data }) => {

    const handleChange = (event) => {
        onFormChange(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let flag = false
        data.map(contact => {
            if (contact.word === userInput) {
                //console.log("found a double");
                flag = true
            }
        })
        if(flag === false) {
            onFormSubmit()
        }
        
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" required value={userInput} onChange={handleChange}></input>
                <input type="submit" ></input>
            </form>
        </>
    )
}


