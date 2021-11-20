import classNames from "classnames";
import React, { useState } from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const dayData = props.days.map((day) => {
    return(
      <DayListItem 
      key={day.id}
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.value}
      setDay={() => props.onChange(day.name)} 
      />
    );
  });

  return (
    <ul>
      {dayData}
    </ul>
  )
}
