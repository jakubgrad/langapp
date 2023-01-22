import React from 'react';


export const Counter = ({ count, setCount, Loader2, wordlist2 }) => {
    
    const add = () => {
        setCount(count+1)
        Loader2(wordlist2[count+1]) 
    }
    const sub = () => {
        setCount(count-1)
        Loader2(wordlist2[count])
    }

    return(
        <>
        <button onClick={add}>Add</button>
        <button onClick={sub}>Sub</button>
        {count}
        </>
    ) 
}