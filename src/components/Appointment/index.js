import React from "react";
import "components/Appointment/styles.scss";
import classNames from "classnames";
import { action } from "@storybook/addon-actions/dist/preview";


export default function Appointment(props) {
  
 return (
  <article className="appointment">
    {props.time && (`Appointment at ${props.time}`)}
    </article>

  );
}
