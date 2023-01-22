import React from 'react';

export const Loader = ( {wordlist, onFormSubmit} ) => {
    //console.log("prop from word file: " + value)

    wordlist.map(word => {
            console.log("loading "+word);
                fetch('/data/create', {
                    method: 'POST',
                    body: JSON.stringify({
                        word:word,
                        name:word
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }).then(response => response.json()).then(message => 
                    {console.log(message);
                    
                    })
                
            }
    )
        
        
    return (
    <>
    this is your friendly loader.
    </>
    )
}