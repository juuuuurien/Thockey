import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { generateStars } from "./helpers/generateStars";
import { context } from "./context/context";
import dayjs from "dayjs";

const StarryBackground = () => {
  const [stars, setStars] = useState(generateStars());
  const requestRef = useRef();
  // const [state, setState] = useContext(context);

  // const draw = () => {
  //   // get stars and paint them into canvas
  //   const context = canvasRef.current.getContext("2d");
  //   // console.log(state);
  //   //Our first draw
  //   context.canvas.width = window.innerWidth;
  //   context.canvas.height = window.innerHeight;
  //   context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  //   const gradient = context.createLinearGradient(0, 0, 0, window.innerHeight);
  //   gradient.addColorStop(0, "#08091f");
  //   gradient.addColorStop(0.55, "#08091f");
  //   gradient.addColorStop(1, "#0c225e");
  //   context.fillStyle = gradient;
  //   context.fillRect(0, 0, window.innerWidth, window.innerHeight);
  //   context.save();

  //   // let stars = generateStars();
  //   // console.log(stars);
  //   // stars.forEach((star) => {
  //   //   if (star.y < 0) star.y = window.innerHeight;
  //   //   context.fillStyle = star.color;
  //   //   context.fillRect(
  //   //     star.x,
  //   //     (star.y -=
  //   //       Math.ceil(star.speed * Math.pow(1.03271, state) * 100) / 100),
  //   //     star.size,
  //   //     star.size
  //   //   );
  //   //   // context.fillRect((star.x += 1), star.y, star.size, star.size);
  //   // });
  //   // context.restore();
  //   // console.log(stars);

  //   // setStars((prevStars) => {
  //   //   const stars = prevStars.map((star) => {
  //   //     let _star = {
  //   //       x: (star.x += 1),
  //   //       y: star.y,
  //   //       color: star.color,
  //   //       speed: star.speed,
  //   //     };
  //   //     return _star;
  //   //   });
  //   //   // console.log(stars);
  //   //   return stars;
  //   // });

  //   setState((prevState) => (prevState += 1));
  //   requestRef.current = requestAnimationFrame(draw);
  // };
  const updateAnimationState = useCallback((lastTime) => {
    //change state here
    const time = dayjs();
    // console.log(stars[0].y);
    setStars((prevStars) => {
      // console.log(timeDiff);
      const stars = prevStars.map((star) => {
        let _star = {
          x: star.x,
          y: (star.y -= star.speed),
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
  }, []);

  useEffect(() => {
    const time = dayjs();
    requestRef.current = requestAnimationFrame(() => {
      updateAnimationState(time);
    });
    return () => cancelAnimationFrame(requestRef.current);
  });

  return <Canvas stars={stars} />;
};

const Canvas = (props) => {
  const canvasRef = useRef();
  const stars = props.stars;
  const [state] = useContext(context);
  // console.log(stars);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    // console.log(state);
    //Our first draw
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    const gradient = context.createLinearGradient(0, 0, 0, window.innerHeight);
    gradient.addColorStop(0, "#08091f");
    gradient.addColorStop(0.55, "#08091f");
    gradient.addColorStop(1, "#0c225e");
    context.fillStyle = gradient;
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);

    // let stars = generateStars();
    // console.log(stars);

    stars.forEach((star) => {
      if (star.y < 0) star.y = window.innerHeight;
      context.fillStyle = star.color;
      context.fillRect(
        star.x,
        // increase acceleration via wpm.
        (star.y -= star.speed * state.cps),
        star.size,
        star.size
      );
      // context.fillRect((star.x += 1), star.y, star.size, star.size);
    });
    // console.log(stars);
  });

  return <canvas ref={canvasRef} className="background" />;
};

export default StarryBackground;
