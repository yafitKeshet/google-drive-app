import React from "react";
import classes from "./Separator.module.css";

const Separator = (props) => {
  return (
    <div className={`${classes.separator} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Separator;
