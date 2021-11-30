import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";
import useVisualMode from "hooks/useVisualMode";
import Show from "./Appointment/Show";
import Empty from "./Appointment/Empty";

export default function Application(props) {

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

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview)

    return(
      <Appointment
        key={appointment.id}
        {...appointment}
      />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Schedule"
        />
        <hr className="sidebar__separator sidebare--centered" />
          <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}
