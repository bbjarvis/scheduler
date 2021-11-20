import React from "react";
import classNames from "classnames";
import { action } from "@storybook/addon-actions/dist/preview";


export default function Empty(props) {
  
 return (
   <main className="appointment__add">
     <img
     className="appointment__add-button"
     src="images/add.png"
     alt="Add"
     onClick={props.onAdd}
     />
   </main>
  );
}
