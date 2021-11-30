import React, { useState } from "react";


export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);



  function transition(updateMode) {
    // const lastMode = mode;
   setMode(updateMode)
   setHistory(prevState => {
     return([... prevState, updateMode])
   })

  }

  function back() {

    if(history.length < 2)return

    setMode(history[history.length-2])

    setHistory(prevState => {
      return(prevState.slice(0, prevState.length-1))
    })
  }

  
  return { mode, transition, back }
}
