import classNames from "classnames";
import React, { useState } from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const dayData = props.days.map((days) => {
    return(
      <DayListItem 
      key={days.id}
      name={days.name} 
      spots={days.spots} 
      selected={days.name === props.day}
      setDay={props.setDay}  
      />
    );
  });

  return (
    <ul>
      {dayData}
    </ul>
  )
}
