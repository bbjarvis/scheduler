import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";

export default function Application(props) {
  // const appointments = {
  //   "1": {
  //     id: 1,
  //     time: "12pm",
  //   },
  //   "2": {
  //     id: 2,
  //     time: "1pm",
  //     interview: {
  //       student: "Lydia Miller-Jones",
  //       interviewer:{
  //         id: 3,
  //         name: "Sylvia Palmer",
  //         avatar: "https://i.imgur.com/LpaY82x.png",
  //       }
  //     }
  //   },
  //   "3": {
  //     id: 3,
  //     time: "2pm",
  //   },
  //   "4": {
  //     id: 4,
  //     time: "3pm",
  //     interview: {
  //       student: "Archie Andrews",
  //       interviewer:{
  //         id: 4,
  //         name: "Cohana Roy",
  //         avatar: "https://i.imgur.com/FK8V841.jpg",
  //       }
  //     }
  //   },
  //   "5": {
  //     id: 5,
  //     time: "4pm",
  //   }
  // };
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  const setDay = day => setState({ ...state, day});
  const setDays = (days) => setState(prev => ({ ...prev, days }));
  const dailyAppointments = [];
  
  const appArray = dailyAppointments.map((appointment) => {
    return(
      <Appointment
        key={appointment.id}
        {...appointment}
      />
    )
  })

  useEffect(() => {
    const daysURL = 'http://localhost:8001/api/days'
    axios.get(daysURL).then(res => {
      setDays(res.data)
    })
  }, [])

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
        {appArray}
      </section>
    </main>
  );
}
