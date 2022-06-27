import robot from 'robotjs';

const getCoordinates = () => {
  const { x, y } = robot.getMousePos();
  return (`mouse_position ${x},${y}`);
};
export default getCoordinates;
