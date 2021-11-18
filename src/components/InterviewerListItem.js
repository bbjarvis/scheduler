import classNames from "classnames";
import React, { useState } from "react";
import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {
  let intClass = classNames('interviewers__item',
  {"interviewers__item--selected": props.selected})

  return (

    <li
      onClick={props.setInterviewer}
      className={intClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt="Sylvia Palmer"
      />
      {props.selected && props.name}
    </li>

  );
}