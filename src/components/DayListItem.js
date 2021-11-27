import classNames from "classnames";
import React from "react";
import "components/DayListItem.scss"

export default function DayListItem(props) {
  let dayClass = classNames('day-list__item',
  {"day-list__item--selected": props.selected},
  {"day-list__item--full": props.spots === 0})

  let spotsRem = ''

  const formatSpots = () => {
    if (props.spots === 0) {
      spotsRem = 'no spots remaining'
    }
    if (props.spots === 1) {
      spotsRem = '1 spot remaining'
    }
    if (props.spots > 1) {
      spotsRem = props.spots + ' spots remaining'
    }
  }

  formatSpots();

  return (

      <li
      onClick={props.setDay}
      className={dayClass}
      >
        <h2 className="text--regular">{props.name}</h2>
        <h3 className="text--light">{spotsRem}</h3>
      </li>

  );
}