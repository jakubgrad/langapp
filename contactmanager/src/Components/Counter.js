import React from 'react';


export const Counter = ({ count, setCount, Loader, wordlist }) => {
    
    const add = () => {
        setCount(count+1)
        Loader(wordlist[count+1]) //loads another line of words
    }
    const sub = () => {
        setCount(count-1)
        Loader(wordlist[count]) //loads a line of words in case they weren't loaded
    }

    return(
        <>
        <button style={{padding:3, margin:2}} onClick={add}>Add</button>
        <button style={{padding:3, margin:2}} onClick={sub}>Sub</button>
        <span style={{padding:3, margin:1,backgroundColor: "lavender", border: '1px solid black',borderRadius: '5px'}}>Line nr. {count}</span>
        </>
    ) 
}