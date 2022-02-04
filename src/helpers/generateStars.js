export const generateStars = () => {
  let _stars = [];

  for (let i = 0; i < 65; i++) {
    let _x = Math.floor(Math.random() * window.innerWidth);
    let _y = Math.floor(Math.random() * window.innerHeight);
    let _size = Math.floor(Math.random() * (6 - 2) + 1);
    let _speed;
    let _color;

    switch (_size) {
      case 3: {
        _speed = 0.55;
        _color = "white";
        break;
      }
      case 2: {
        _speed = 0.35;
        _color = "white";
        _size = 1.5;
        break;
      }
      case 4: {
        if (Math.random() > 0.75) {
          _speed = 0.15;
          _color = "rgb(256,256,256,0.3)";
          _size = 5;
          break;
        } else {
          _speed = 0.095;
          _color = "white";
          _size = 1;
          break;
        }
      }
      default:
        break;
    }

    _stars.push({
      x: _x,
      y: _y,
      size: _size,
      speed: _speed,
      color: _color,
    });
  }

  return _stars;
};
