import React from 'react';
import { useSpring, config, animated } from 'react-spring';
import './Square.scss';

const Square = ({ handleClick, instrument, step, value, handleMouseEnter }) => {
  // const [springActive,setSpringActive] = useState(false);
  //   //  useEffect(()=> {},[value])
  //   console.log('step: ', step);
  //   console.log('value: ', value);
  let color;
  if (value === 0) {
    color = 'rgb(10,10,10)';
  } else if (value === 1) {
    color = 'rgb(240,110,110)';
  } else if (value === 2) {
    color = 'rgb(235,10,10)';
  }
  const animationProps = useSpring({
    backgroundColor: color,
    config: config.slow,
  });

  const handleSquareClick = (e) => {
    handleClick({ instrument, step, value });
  };
  const handleSquareMouseEnter = (e) => {
    handleMouseEnter({ instrument, step, value });
  };
  return (
    <animated.div
      style={animationProps}
      onClick={handleSquareClick}
      className='square'
      onMouseEnter={handleSquareMouseEnter}
    ></animated.div>
  );
};

export default Square;