import React from 'react'
import "components/Appointment/styles.scss";
import classNames from "classnames";
import { action } from "@storybook/addon-actions/dist/preview";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  
 return (
  <article className="appointment">
    <Header time={props.time}/>
    {props.interview ? 
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer.id}
    /> 
    : <Empty />}
    </article>

  );
}
