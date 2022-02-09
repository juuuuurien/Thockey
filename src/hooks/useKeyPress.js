import { useState, useEffect, useContext } from "react";
import { context } from "../context/context";

//1
const useKeyPress = (callback) => {
  //2
  const [state, setState] = useContext(context);
  const [keyPressed, setKeyPressed] = useState(null);
  const [multipleKeyPress, setMultipleKeyPress] = useState(false);
  //3
  useEffect(() => {
    // console.log(keyPressed);
    // console.log(multipleKeyPress);
    const downHandler = (event) => {
      if (event.getModifierState("CapsLock")) {
        setState({ ...state, capslock: true });
      } else {
        setState({ ...state, capslock: false });
      }
      event.preventDefault();
      let { key } = event;

      //handles only 1 key press
      if ((keyPressed !== key && key.length === 1) || key === "Backspace") {
        setKeyPressed(key);
        callback && callback(key);
      }

      if (
        (key === "Enter" || key === "Alt") &&
        keyPressed !== key &&
        keyPressed === null
      ) {
        setKeyPressed(key);
      }
      if (
        ((key === "Enter" || key === "Alt") &&
          keyPressed !== key &&
          keyPressed === "Alt") ||
        keyPressed === "Enter"
      ) {
        setKeyPressed([keyPressed, key]);
        setMultipleKeyPress(true);
        callback && callback("ResetMacro");
      }
    };
    //5
    const upHandler = () => {
      if (multipleKeyPress) {
        setKeyPressed(keyPressed[0]);
        setMultipleKeyPress(false);
      } else {
        setKeyPressed(null);
      }
    };

    //6
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      //7
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  });
  //8
  return keyPressed;
};

export default useKeyPress;
