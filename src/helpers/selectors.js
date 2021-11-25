import React from "react";
import classNames from "classnames";
import { action } from "@storybook/addon-actions/dist/preview";

export function getAppointmentsForDay(state, day) {
  const appointments = []

  const filteredState = state.days.filter(state => state.name === day)

  if(!filteredState.length) return appointments

  filteredState[0].appointments.forEach((appID) => {
    if(state.appointments[appID]){appointments.push(state.appointments[appID])}
  })

  console.log(filteredState)

  return appointments
}