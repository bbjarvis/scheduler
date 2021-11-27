

export function getAppointmentsForDay(state, day) {
  const appointments = []

  const filteredState = state.days.filter(state => state.name === day)

  if(!filteredState.length) return appointments

  filteredState[0].appointments.forEach((appID) => {
    if(state.appointments[appID]){appointments.push(state.appointments[appID])}
  })

  return appointments
}

export function getInterview(state, interview) {

  if(!interview) return(null)

  const intID = interview.interviewer

  const interviewData = { ...interview, interviewer: state.interviewers[intID]}

  return interviewData
}
