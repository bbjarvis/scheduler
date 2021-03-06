import React from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  // mode constants
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)

    if(!interview.interviewer || !interview.student) {
        return(transition(ERROR_SAVE, true))
      }

      props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))
    
  }

  const deleteItem = (name, interviewer) => {
    transition(DELETING, true)
    
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true))
  }

  const confirm = () => {
    transition(CONFIRM)
  }

 return (
  <article className="appointment" data-testid="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === CREATE && <Form interviewers={props.interviewers}
      onSave={save} onCancel={back} />}
    {mode === SAVING && <Status message="Saving"/>}
    {mode === DELETING && <Status message="Deleting"/>}
    {mode === EDIT && <Form 
      student={props.interview.student}
      interviewer={props.interview.interviewer.id}
      interviewers={props.interviewers} 
      onSave={save} onCancel={back} />}

    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        onDelete={confirm}
        onEdit={() => transition(EDIT)}
      />
    )}
    {mode === CONFIRM && (
      <Confirm
        message="Are you sure you want to delete your appointment?"
        onCancel={back}
        onConfirm={deleteItem}
    />
    )}
    {mode === ERROR_SAVE && (
      <Error
        message="Error Saving"
        onClose={back}
      />
    )}
    {mode === ERROR_DELETE && (
      <Error
        message="Error Deleting"
        onClose={back}
      />
    )}
    
    </article>

  );
}

