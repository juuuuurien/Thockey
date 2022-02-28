import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { generateStars } from "./helpers/generateStars";
import { context } from "./context/context";

const StarryBackground = () => {
  const [state] = useContext(context);
  const [stars, setStars] = useState(generateStars());
  const requestRef = useRef();

  const updateAnimationState = useCallback(() => {
    //change state here

    setStars((prevStars) => {
      const stars = prevStars.map((star) => {
        let _star = {
          x: star.x,
          y: star.y,
          size: star.size,
          color: star.color,
          speed: star.speed
        };
        return _star;
      });
      return stars;
    });

    // requestRef.current = requestAnimationFrame(() => {
    //   updateAnimationState();
    // });
  }, [requestRef]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(() => {
      updateAnimationState();
    });
    return () => cancelAnimationFrame(requestRef.current);
  });

  return <Canvas stars={stars} setStars={setStars} />;
};

const Canvas = (props) => {
  const canvasRef = useRef();
  const stars = props.stars;
  const setStars = props.setStars;
  const [state] = useContext(context);
  // console.log(stars);

  useEffect(() => {
    // IDEA: DRAW A CANVAS THATS REALLY BIG AND THEN JUST TRANSLATE THE POSITION DOWN LIKE A SCROLL
    const context = canvasRef.current.getContext("2d");

    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    if (!state.settingStars) {
      stars.forEach((star) => {
        let _speed =
          star.speed +
          (star.speed * (state.wpm * -0.007 * state.msElapsed)) / 1000;
        if (star.y < 0) {
          star.y = window.innerHeight;
          star.x = Math.floor(Math.random() * window.innerWidth);
        }
        if (star.y > window.innerHeight) {
          star.y = 0;
          star.x = Math.floor(Math.random() * window.innerWidth);
        }
        context.fillStyle = star.color;
        context.fillRect(
          star.x,
          // increase acceleration via wpm.
          (star.y -= _speed),
          star.size,
          star.size
        );
      });
    } else {
      setStars(generateStars);
    }
  });

  return (
    <canvas
      ref={canvasRef}
      className={
        state.settingStars ? "background fade-out" : "background fade-in"
      }
    />
  );
};

export default StarryBackground;
