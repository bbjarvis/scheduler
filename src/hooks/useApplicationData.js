import { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

export default function useApplicationData(initial){

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  useEffect(() => {
    const daysURL = 'http://localhost:8001/api/days'
    const appointmentsURL =  "http://localhost:8001/api/appointments"
    const interviewsURL =  "http://localhost:8001/api/interviewers"
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewsURL)
    ]).then(all => {
      setState(prev => 
        ({ ...prev, days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));
    })

  }, [])

  const setDay = day => setState({ ...state, day});
  

  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    return axios.put(`/api/appointments/${id}`, {interview})
    .then((res)=> {

    const days = updateSpots(state.day, false)

    setState({
      ...state,
      appointments,
      days
    })

    })
    .catch((error) => {

      return(Promise.reject(error))
    });

  }
  const cancelInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
    .then((res)=> {

      const days = updateSpots(state.day, true)
    
      setState({
      ...state,
      appointments,
      days
      })
  
    })
    .catch((error) => {

      return(Promise.reject(error))
    });

  }
  const updateSpots = (day, add) => {
    // if "add" is true, add a spot, if false, remove
    let spots = 0;

    const spotsArray = state.days.map((today) => {
    if(today.name === day){

      add ? spots = today.spots + 1 : spots = today.spots - 1;
      today.spots= spots

      return today

    }

    return today
    })

    return spotsArray

  }
  return { state, setDay, bookInterview, cancelInterview}

}