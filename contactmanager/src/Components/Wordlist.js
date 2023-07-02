import React from 'react';
import {Word} from '../Components/Word';

export const Wordlist = ( {wordlist, onFormChange, onFormSubmit, data} ) => {
    let number = Math.floor(Math.random() * (1000 - 0 + 1)) + 0
    return (
    <>
    {
    wordlist.map(word => {
        
        number = number + 1
        return (
                <Word key={word+number.toString()} value={word} onFormChange = {onFormChange} onFormSubmit={onFormSubmit} data={data}/>
        )   //key is word. What if it repeats in a sentence?
    }) }
    {/*<Word value={wordlist[0]} onFormChange = {onFormChange} onFormSubmit={onFormSubmit} listOfContacts={listOfContacts}/>
    <Word value={wordlist[1]} onFormChange = {onFormChange} onFormSubmit={onFormSubmit} listOfContacts={listOfContacts}/>
    <Word value={wordlist[2]} onFormChange = {onFormChange} onFormSubmit={onFormSubmit} listOfContacts={listOfContacts}/>*/}
    </>
    )
}