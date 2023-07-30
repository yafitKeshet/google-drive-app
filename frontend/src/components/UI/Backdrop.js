import React from "react";
import "./Backdrop.css";

const Backdrop = (props) => {
  return (
    <div className={`${props.className} backdrop`} onClick={props.onClick} />
  );
};

export default Backdrop;
