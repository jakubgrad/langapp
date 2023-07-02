import React, {useState, useEffect, useMemo} from 'react';
import {Card} from '../Components/Card';
import {Form} from '../Components/Form';
import {Wordlist} from '../Components/Wordlist';
import {Last} from '../Components/Last';
import {Selector} from '../Components/Selector';
import {Counter} from '../Components/Counter';


export const ContactPage = () => {
    
    const [count, setCount] = useState(0)
    const [data, setData] = useState([
        {
        name: "sample name",
        word: "sample definition"
    }])
    const [searchPhrase, setSearchPhrase] = useState('')

    const story = "Kaunis sää Eero ja neljä muutta: Tänään täällä Lapissa on hyvin kaunis ja aurinkoinen ilma. Taivaskin on pilvetön. Liisa: Kyllä, todellakin! Tämä kesä on ollut ihanan lämmin. Eero: Minulle tämä kesä on ollut liian lämmin, melkein yhtä lämmin kuin Välimeren ilmasto.     Liisa: Mutta onneksi tänään on viileämpää. Tänään on kaksikymmentä astetta lämmintä, eilen oli jopa kolmekymmentä astetta. Eero: Tiedätkö minkälainen sää on nyt Helsingissä?    Liisa: Joo, sääennusteen mukaan Helsingissä on rankkasade. Merellä oli jopa myrsky. Eero: Onko siellä yhtä lämmintä kuin Lapissa?    Liisa: Ei, paljon kylmempää. Vain neljätoista astetta lämmintä."
    const [ wordlist, setWordlist ] = useState([story.split(" "),["menemme","ruoanlaitossa","kokeet","ruoanlaitto","tauti","hiihto","ennen","matka","tunti"],["huomenna","eilen","neuvoa","hiihtaa"]])
    //the wordlist is used as default data, for when data from a file wasn't uploaded yet.
    //wordlist is updated with data from python server when getData succeeds
    
    const getData=()=>{
        console.log("Loading data with getData");
        fetch('/data.json'
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
            setWordlist(myJson) //update default wordlist with that from database
            setCount(0) //count defines which line from wordlist is displayed at the moment
            Loader(wordlist[0]) //Loader calls app.py which updates 
            });   
        }

    useEffect(()=> {        //fetches definitions of words
        const check_if_loaded = (word,dane) => {
            console.log("looking if", word, "was loaded")
            console.log(dane.some(e => e.word === word))
            console.log(dane);
            if ( dane.some(e => e.word === word)) {
                console.log("loaded")
            } else {
                             //loader takes each words and sends it to python scripts to find translation
                    console.log("useEffect loading "+word);
                        fetch('/data/create', {
                            method: 'POST',
                            body: JSON.stringify({
                                word:word
                            }),
                            headers: {
                                "Content-type": "application/json; charset=UTF-8"
                            }
                        })
                        
                /*  this would execute every time youpost  
                fetch('/data').then(response => {
                    if (response.ok){
                        console.log("Data that was received with useEffect,",response)
                        return response.json()
                        
                    }
                }).then(data => setData(data))   
                */
            }
        }
            
        

        fetch('/data').then(response => {
            if (response.ok){
                console.log("Data that was received with useEffect,",response)
                return response.json()
                
            }
        }).then(data => {console.log("setData", data); setData(data); wordlist[0].forEach(word => check_if_loaded(word, data) ? console.log("present") : console.log("absent") )})
            
        
        
        
            
    
    }, [])
    

    const handleFormChange = (inputValue) => {
        setSearchPhrase(inputValue)
    }

    const handleFormSubmit = () => {
        console.log("searchPhrase in handleFormSubmit: " + searchPhrase);
        fetch('/data/create', {
            method: 'POST',
            body: JSON.stringify({
                word:searchPhrase
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json()).then(message => 
            {console.log(message);
            getLatestData();
            setSearchPhrase('')
            })
        
    }

    const deleteWord = (name) => {
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
            getLatestData()
            })
        
    }

    const getLatestData = () => {
        fetch('/data').then(response => {
            if(response.ok){
                return response.json()
            }
        }).then(data => setData(data))
    }

    const Loader = (wl) => {        //wl stands for wordlist
        console.log("Loader called with the wordlist" + wl); //Loader reloaded together with parent component?
       wl.map(word => {             //loader takes each word and sends it to python scripts to find translation
                console.log("loading "+word);
                    fetch('/data/create', {
                        method: 'POST',
                        body: JSON.stringify({
                            word:word
                        }),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    }).then(response => response.json()).then(message => 
                        {console.log(message);
                            getLatestData(); //you should do that after every term is POST to the flaskapp
                            setSearchPhrase('')
                        })
                    
                })
        //:  console.log("dd");
            
    }
    
   //const cachedValue = useMemo(() => Loader(wordlist[count]), [])
    //const cachedData = useMemo(() => getData())
    
    return (
        <>
       
        {/*cachedValue*/}
       
        <div style={{"textAlign":"left", "margin":"5px"}}>
            <Wordlist wordlist={wordlist[count]} onFormChange = {handleFormChange} onFormSubmit={handleFormSubmit} data={data}/>
        </div>
        
        <br></br>
        <div style={{"textAlign":"center"}}>
        <button style={{padding:3, margin:2}} onClick={getData}>Get Data</button>
            <Counter count={count} setCount={setCount} Loader={Loader} wordlist={wordlist}/>
            <Form userInput={searchPhrase} onFormChange = {handleFormChange} onFormSubmit={handleFormSubmit} data={data}/>
        </div>
        <br></br>
        <div className="App2">
        <Selector data={data} selected={searchPhrase} onDelete={deleteWord}/>    
        {/*<Last data={data} onDelete={deleteWord}/> last word. For now unnecessary*/}
        {/*<Card data={data} onDelete={deleteWord}/>  those are past words, useful for development */}
        </div>
        </>
    )
}
