import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { generateStars } from "./helpers/generateStars";
import { context } from "./context/context";
import dayjs from "dayjs";

const StarryBackground = () => {
  const [state] = useContext(context);
  const [stars, setStars] = useState(generateStars());
  const requestRef = useRef();

  const updateAnimationState = useCallback(
    (lastTime) => {
      //change state here
      const time = dayjs();

      setStars((prevStars) => {
        const stars = prevStars.map((star) => {
          let _star = {
            x: star.x,
            y: star.y,
            size: star.size,
            color: star.color,
            speed: star.speed,
          };
          return _star;
        });
        return stars;
      });

      lastTime = time;
      requestRef.current = requestAnimationFrame(() => {
        updateAnimationState(lastTime);
      });
    },
    [requestRef]
  );

  useEffect(() => {
    const time = dayjs();
    requestRef.current = requestAnimationFrame(() => {
      updateAnimationState(time);
    });
    return () => cancelAnimationFrame(requestRef.current);
  }, [state.started, updateAnimationState]);

  return <Canvas stars={stars} />;
};

const Canvas = (props) => {
  const canvasRef = useRef();
  const stars = props.stars;
  const [state] = useContext(context);
  // console.log(stars);

  useEffect(() => {
    // IDEA: DRAW A CANVAS THATS REALLY BIG AND THEN JUST TRANSLATE THE POSITION DOWN LIKE A SCROLL
    const context = canvasRef.current.getContext("2d");
    // console.log(state);
    //Our first draw
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    let gradSpeed = ((state.wpm - 30) * 0.003 * state.msElapsed) / 1000;
    const gradient = context.createLinearGradient(0, window.innerHeight, 0, 0);

    let gradStop = 0.15;
    // gradient.addColorStop(0, "#08091f");
    if (gradStop - gradSpeed / 30 > 0) {
      gradStop = gradStop - gradSpeed / 30;
    } else {
      gradStop = 0;
    }

    gradient.addColorStop(0, "#061d54"); // lighter blue
    gradient.addColorStop(gradStop, "rgb(4,9,31,0.4)");
    gradient.addColorStop(0.75, "rgb(0,0,0,0)");
    // let stars = generateStars();
    // console.log(stars);

    stars.forEach((star) => {
      let _speed =
        star.speed +
        (star.speed * (state.wpm * -0.007 * state.msElapsed)) / 1000;
      if (star.y < 0) star.y = window.innerHeight;
      if (star.y > window.innerHeight) star.y = 0;
      context.fillStyle = star.color;
      context.fillRect(
        star.x,
        // increase acceleration via wpm.
        (star.y -= _speed * 0.3),
        star.size,
        star.size
      );
    });

    context.fillStyle = gradient;
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    // console.log(stars);
  });

  return <canvas ref={canvasRef} className="background" />;
};

export default StarryBackground;
