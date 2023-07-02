import { render } from '@testing-library/react';
import axios from 'axios';
import React, { Component }  from 'react';
import './App.css';
//import './wiki.css';
import {ContactPage} from './Pages/ContactPage';
//import {FileUpload} from './Components/FileUpload';
require('dotenv').config()

function App() {
//Below: unfinished implementation of file reading
/*
  const handleFileSubmit = () => {
    //console.log("addContact in handleFormSubmit: " + addContact);
    fetch('/api/uploadfile', {
        method: 'POST',
        body: JSON.stringify({
            state:state,
            name:"nani"
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => response.json()).then(message => 
        {console.log(message);
        })
    
}

  let state = {
    // Initially, no file is selected
    selectedFile: null,
    value: null
  };
   
  // On file select (from the pop up)
  const onFileChange = event => {
   
    // Update the state
    state = { selectedFile: event.target.files[0], value: document.getElementById('input').files[0]}//event.target.value }
    
  };
   
  // On file upload (click the upload button)
  const onFileUpload = () => {
   
    // Create an object of formData
    const formData = new FormData();
   
    // Update the formData object
    formData.append(
      "myFile",
      state.selectedFile,
      state.selectedFile.name
    );

    
    // Details of the uploaded file
    console.log("state.selectedFile: " + state.selectedFile);
   
    // Request made to the backend api
    // Send formData object
    //axios.post("api/uploadfile", formData);
    handleFileSubmit()
  };
   
  // File content to be displayed after
  // file upload is complete
  const fileData = () => {
   
    if (state.selectedFile) {
        
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>

          <p>File Type: {this.state.selectedFile.type}</p>

          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>

        </div>
      );
    } else {
      
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };
  */

  return (
    <div className="App">
     {/* Unfinished file upload form
      <div>
                <input id="input" type="file" onChange={onFileChange} />
                <button onClick={onFileUpload} >
                  Upload!
                </button>
            </div>
          fileData()*/}
        
      <ContactPage />
    </div>
  );
}

export default App;
