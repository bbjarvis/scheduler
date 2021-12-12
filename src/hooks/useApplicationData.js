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
    console.log(state)

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
    setState({
      ...state,
      appointments
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
    setState({
      ...state,
      appointments
    })

    })
    .catch((error) => {

      return(Promise.reject(error))
    });

  }
  return { state, setDay, bookInterview, cancelInterview}

}