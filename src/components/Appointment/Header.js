import React from "react";
import classNames from "classnames";
import { action } from "@storybook/addon-actions/dist/preview";


export default function Header(props) {
  
 return (
  <header className="appointment__time">
    <h4 className="text--semi-bold">{props.time}</h4>
    <hr className="appointment__separator" />
  </header>

  );
}
