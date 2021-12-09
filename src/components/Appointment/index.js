import React from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  // mode constants
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const CANCELLING = "CANCELLING"


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
  }

  const deleting = (name, interviewer) => {
    transition(DELETING)
    
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
  }

  const confirm = () => {
    transition(CONFIRM)
  }

 return (
  <article className="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === CREATE && <Form interviewers={props.interviewers} 
      onSave={save} onCancel={back} />}
    {mode === SAVING && <Status message="Saving..."/>}
    {mode === DELETING && <Status message="Deleting..."/>}
    {mode === CANCELLING && <Status message="Cancelling..."/>}

    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        onDelete={confirm}
      />
    )}
      {mode === CONFIRM && (
    <Confirm
        message="Are you sure you want to delete your appointment?"
        onCancel={back}
        onConfirm={deleting}
    />
    )}
    </article>

  );
}
