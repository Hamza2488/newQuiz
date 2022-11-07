import { Button, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { sendData } from '../../firebase/firebasemethod'

const Addquiz = () => {
    const [question, setQuestion] = useState("")
    const [options, setOptions] = useState({})
    const [correctOption, setCorrectOption] = useState("")
   
    const sendDataHandler = ()=>{
        sendData({question,options,correctOption},'quiz')
    }
    
  return (
    <>
    
    <TextField
    label="Question"
    onChange={(e) => setQuestion(e.target.value)}
    variant="standard"
    sx={{ width: "80%", mx: 5 }}
    />
    <TextField
    label="Option 1"
    onChange={(e) => setOptions(e.target.value)}
    variant="standard"
    sx={{ width: "40%", mx: 5 }}
    />
    <TextField
    label="Option 2"
    onChange={(e) => setOptions(e.target.value)}
    variant="standard"
    sx={{ width: "40%", mx: 5 }}
    />
    <TextField
    label="Option 3"
    onChange={(e) => setOptions(e.target.value)}
    variant="standard"
    sx={{ width: "40%", mx: 5 }}
    />
    <TextField
    label="Option 4"
    onChange={(e) => setOptions(e.target.value)}
    variant="standard"
    sx={{ width: "40%" , mx: 5}}
    />
    <TextField
    label="Correct Option"
    onChange={(e) => setCorrectOption   (e.target.value)}
    variant="standard"
    sx={{ width: "85%" , mx: 5}}
    />
    
    <br />
    <Button variant='contained' onClick={sendDataHandler} sx={{ width: "10%" , mx: 5, mt:5}}>        SEND DATA 
    </Button>
    </> 
  )
}

export default Addquiz