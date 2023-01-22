import React, {useState, useEffect, useMemo} from 'react';
import {Card} from '../Components/Card';
import {Form} from '../Components/Form';
import {Word} from '../Components/Word';
import {Wordlist} from '../Components/Wordlist';
import {Last} from '../Components/Last';
import {Selector} from '../Components/Selector';
import {Counter} from '../Components/Counter';
//import {Loader} from '../Components/Loader';

export const ContactPage = () => {
    const [data, setData]=useState([])
    const [count, setCount] = useState(0)
    const [contact, setContact] = useState([])
    const [addContact, setAddContact] = useState('')
    const [word1, setWord] = useState('something')
    const [selected, setSelected] = useState('neuvola')
    const wordlist = ["ennen","maanantai", "neuvola", "vatsa", "leuka", "matka"]
    const [ wordlist2, setWordlist2 ] = useState([["vatsa","tauti","hiihto","ennen","matka","tunti"],["huomenna","eilen","neuvoa","hiihtaa"]])

        const getData=()=>{
            console.log("LOADING");
            fetch('data.json'
            ,{
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
            }
            )
              .then(function(response){
                console.log(response)
                return response.json();
              })
              .then(function(myJson) {
                console.log(myJson);
                setData(myJson)
                setWordlist2(myJson)
                setCount(0)
                Loader2(wordlist2[0])
              });   
          }

    useEffect(()=> {
        fetch('/data').then(response => {
            if (response.ok){
                console.log(response)
                return response.json()
                
            }
        }).then(data => setContact(data))
    }, [])
    

    const handleFormChange = (inputValue) => {
        setAddContact(inputValue)
    }

    const handleFormChange2 = ( word ) => {
        //console.log("PROP: " + word);
        setAddContact(word)
    }

    const handleFormSubmit = () => {
        console.log("addContact in handleFormSubmit: " + addContact);
        fetch('/data/create', {
            method: 'POST',
            body: JSON.stringify({
                word:addContact,
                name:addContact
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json()).then(message => 
            {console.log(message);
            getLatestContacts();
            setAddContact('')
            })
        
    }

    const deleteContact = (name) => {
        fetch('/data/delete', {
            method: 'POST',
            body: JSON.stringify({
                name:name
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json()).then(message => {
            console.log(message);
            getLatestContacts()
            })
        
    }

    const getLatestContacts = () => {
        fetch('/data').then(response => {
            if(response.ok){
                return response.json()
            }
        }).then(data => setContact(data))
    }

    const Loader = () => {
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
                            getLatestContacts();
                            setAddContact('')
                        })
                    
                }
        )
    }

    const Loader2 = (wl) => {
        console.log("LOADER2 CALLED with " + wl);
       wl.map(word => {
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
                            getLatestContacts();
                            setAddContact('')
                        })
                    
                })
        //:  console.log("dd");
            
    }
    
    const cachedValue = useMemo(() => Loader2(wordlist2[count]), [])
    //const cachedData = useMemo(() => getData())
    
    return (
        <>
        {cachedValue}
       
        {/*<Loader wordlist={wordlist} onFormSubmit={handleFormSubmit} listOfContacts={contact}/>*/}
        <Wordlist wordlist={wordlist2[count]} onFormChange = {handleFormChange} onFormSubmit={handleFormSubmit} listOfContacts={contact}/>
        {/*<Word value="kuppi" onFormChange = {handleFormChange} onFormSubmit={handleFormSubmit} listOfContacts={contact}/>
        <Word value="muki" onFormChange = {handleFormChange} onFormSubmit={handleFormSubmit} listOfContacts={contact}/>
        <Word value="ajatus" onFormChange = {handleFormChange} onFormSubmit={handleFormSubmit} listOfContacts={contact}/>
    <Word value="sairaus" onFormChange = {handleFormChange} onFormSubmit={handleFormSubmit} listOfContacts={contact}/>*/}
        <br></br>
        <Counter count={count} setCount={setCount} Loader2={Loader2} wordlist2={wordlist2}/>
        <button onClick={getData}>Get Data</button>
        <Selector listOfContacts={contact} selected={addContact} onDelete={deleteContact}/>    
        <Form userInput={addContact} setWord={setWord} onFormChange = {handleFormChange} onFormSubmit={handleFormSubmit} listOfContacts={contact}/>
        <div className="App2">
        <Last listOfContacts={contact} onDelete={deleteContact}/>
        <Card listOfContacts={contact} onDelete={deleteContact}/>
        </div>
        </>
    )
}
