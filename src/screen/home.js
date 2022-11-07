import { Button } from '@mui/material'
import { Box } from '@mui/system'
import { setUserId } from 'firebase/analytics'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useRouteLoaderData } from 'react-router-dom'
import { checkUser, sendData } from '../firebase/firebasemethod'



const Home = () => {

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore]= useState(0)
    const [showScore, setShowScore] = useState(false)
    const navigate = useNavigate()
    const params = useParams()
   

    let questions = [
        {
            Question: "Independence day of Pakistan",
           AnswerTex:[
           {Answer:"15 August", isCorrect: false},
            {Answer:"16 August", isCorrect: false},
            {Answer:"18 August", isCorrect: false},
            {Answer:"14 August", isCorrect: true}
           ]
        },
        {
            Question: 'Independence day of India',
            AnswerTex:[
                {Answer:"15 Augst", isCorrect: true},
                {Answer:"16 August", isCorrect: false},
                {Answer:"18 August", isCorrect: false},
                {Answer:"14 August", isCorrect: false},
               ]
        },
        {
            Question: 'Independence day of Malaysia',
            AnswerTex:[
                {Answer:"15 August", isCorrect: false},
                {Answer:"16 August", isCorrect: false},
                {Answer:"31 August", isCorrect: true},
                {Answer:"14 August", isCorrect: false},
               ]
        },
        {
            Question: 'Independence day of Namibia',
            AnswerTex:[
                {Answer:"15 August", isCorrect: false},
                {Answer:"16 August", isCorrect: false},
                {Answer:"21 March", isCorrect: true},
                {Answer:"14 August", isCorrect: false},
               ]
        },
        {
            Question: 'Independence day of UAE',
            AnswerTex:[
                {Answer:"15 August", isCorrect: false},
                {Answer:"16 August", isCorrect: false},
                {Answer:"6 December", isCorrect: true},
                {Answer:"14 August", isCorrect: false},
               ]
        },
        {
            Question: 'Independence day of Yemen',
            AnswerTex:[
                {Answer:"15 August", isCorrect: false},
                {Answer:"16 August", isCorrect: false},
                {Answer:"30 November", isCorrect: true},
                {Answer:"14 August", isCorrect: false},
               ]
        },
    ]


    const handleAnswerResponse=(isCorrect)=>{
        if (isCorrect) {
            setScore(score+1)
            
        }

        const nextQuestion = currentQuestion+1;

        if (nextQuestion<questions.length) {
            setCurrentQuestion(nextQuestion)
            sendData({
                score: score,
                currentQuestion: currentQuestion,
                isCorrect: isCorrect,
              }, `answers/${currentQuestion}`).then((currentQuestion) => {
                console.log(currentQuestion)
              }).catch((err) => {
                console.log(err)
              })
        }else{
            setShowScore(true)
        }
    }

    const resetQuiz=()=>{
        window.location.reload(true)
    }


    //firebase methods

    useEffect(() => {
        checkUser().then((res) => {
          console.log(res)
          if (params.id == res) {
            setUserId(res);
      
    
          } else {
        
          }
        }).catch((err) => {
          console.log(err)
        })
      }, [])
    

  return (
    <>
    <Box className='sec01'>
        <Box >
<Box className='sec1'>
    <Box className='sec2'>


    
    {showScore?(
        <div>
            <div>

            You have score {score} out of {questions.length}
            </div>
            <div>
            <Button variant="contained" className='button' onClick={resetQuiz}>Play Again</Button>
            
            </div>
        </div>
    )
    :(
        <>
        <div className=''>
            <h1 className='question'>
                {questions[currentQuestion].Question} 
            </h1>
            <div className='Qindex'>
                <span>
                  Questions {currentQuestion} of {questions.length}
                </span>
            </div>
        </div>
        <div className=''>
            <Box sx={{mt:5}}>

            {questions[currentQuestion].AnswerTex.map((answer)=>
            (
                <Box className='answer' onClick={()=>handleAnswerResponse(answer.isCorrect)}>{answer.Answer}</Box>
                ))}
                </Box>
        </div>

        </>
    )}
    </Box>
    </Box>
    </Box>
    </Box>
    </>
  )
}

export default Home