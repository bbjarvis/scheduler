import React from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  // mode constants
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );

 return (
  <article className="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => console.log("Clicked onAdd")} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
    )}
    </article>

  );
}
