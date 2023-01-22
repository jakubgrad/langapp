import React from 'react';
import {Word} from '../Components/Word';

export const Wordlist = ( {wordlist, onFormChange, onFormSubmit, listOfContacts} ) => {
    console.log("wordlist from wordlist js" + wordlist)
    return (
    <>
    {wordlist.map(word => {
        return (
                <Word key={word} value={word} onFormChange = {onFormChange} onFormSubmit={onFormSubmit} listOfContacts={listOfContacts}/>
        )
    }) }
    {/*<Word value={wordlist[0]} onFormChange = {onFormChange} onFormSubmit={onFormSubmit} listOfContacts={listOfContacts}/>
    <Word value={wordlist[1]} onFormChange = {onFormChange} onFormSubmit={onFormSubmit} listOfContacts={listOfContacts}/>
    <Word value={wordlist[2]} onFormChange = {onFormChange} onFormSubmit={onFormSubmit} listOfContacts={listOfContacts}/>*/}
    </>
    )
}