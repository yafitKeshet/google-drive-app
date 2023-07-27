import React from "react";
import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div
      className={`${classes.card} ${props.className}`}
      onClick={props.onClick}
      id={props.id}
    >
      {props.children}
    </div>
  );
};

export default Card;
