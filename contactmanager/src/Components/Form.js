import React from 'react';

export const Form = ({ userInput, setWord, onFormChange, onFormSubmit, listOfContacts }) => {

    const handleChange = (event) => {
        onFormChange(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setWord(userInput)//probably doesnt influence anything since the form passes
        //two addContacts and not word1
        let flag = false
        listOfContacts.map(contact => {
            if (contact.word == userInput) {
                //console.log("found a double");
                flag = true
            }
        })
        if(flag == false) {
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


