import { useState, useEffect, useContext } from "react";
import { context } from "../context/context";

//1
const useKeyPress = (callback) => {
  //2
  const [state, setState] = useContext(context);
  const [keyPressed, setKeyPressed] = useState();
  //3
  useEffect(() => {
    //4
    const downHandler = (event) => {
      if (event.getModifierState("CapsLock")) {
        setState({ ...state, capslock: true });
      } else {
        setState({ ...state, capslock: false });
      }
      event.preventDefault();
      let { key } = event;
      if ((keyPressed !== key && key.length === 1) || key === "Backspace") {
        setKeyPressed(key);
        callback && callback(key);
      }
    };
    //5
    const upHandler = () => {
      setKeyPressed(null);
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
