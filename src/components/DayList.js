import classNames from "classnames";
import React, { useState } from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const dayData = props.days.map((props) => {
    return(
      <DayListItem 
      key={props.id}
      name={props.name} 
      spots={props.spots} 
      selected={props.name === props.value}
      setDay={() => props.onChange(props.name)}  
      />
    );
  });

  return (
    <ul>
      {dayData}
    </ul>
  )
}
