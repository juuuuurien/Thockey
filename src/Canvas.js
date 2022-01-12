import React, { useRef, useEffect } from "react";

const Canvas = (props) => {
  const canvasRef = useRef();
  let stars = [];

  const draw = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    //Our first draw
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;

    const gradient = context.createLinearGradient(0, 0, 0, window.innerHeight);
    gradient.addColorStop(0, "#08091f");
    gradient.addColorStop(0.6, "#08091f");
    gradient.addColorStop(1, "#0c225e");
    context.fillStyle = gradient;
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);

    stars.forEach((star) => {
      if (star.y < 0) star.y = window.innerHeight;
      context.fillStyle = star.color;
      context.fillRect(star.x, (star.y -= star.speed), star.size, star.size);
    });
  };

  useEffect(() => {
    //set our array of stars
    for (let i = 0; i < 45; i++) {
      let _x = Math.floor(Math.random() * window.innerWidth);
      let _y = Math.floor(Math.random() * window.innerHeight);
      let _size = Math.floor(Math.random() * (5 - 2) + 1);
      let _speed;
      let _color;
      switch (_size) {
        case 3: {
          _speed = 1;
          _color = "white";

          break;
        }
        case 2: {
          _speed = 2;
          _color = "white";

          break;
        }
        case 4: {
          if (Math.random() > 0.66) {
            _speed = 0.5;
            _color = "rgb(256,256,256,0.3)";
            break;
          } else {
            _speed = 1;
            _color = "white";
            _size = 2;
            break;
          }
        }
        default:
          break;
      }

      stars.push({
        x: _x,
        y: _y,
        size: _size,
        speed: _speed,
        color: _color,
      });
    }

    setInterval(draw, 60);
    window.addEventListener("resize", draw());
  }, []);

  return <canvas ref={canvasRef} className="canvas" {...props} />;
};
export default Canvas;
