import React from "react";

const Button = (props) => {
  return (
    <div
      className={`${props.className} button`}
      style={{ borderRadius: props.round ? "100%" : "25%" }}
      onClick={props.onClick}
    >
      {props.icon}
      {props.children}
    </div>
  );
};

export default Button;
