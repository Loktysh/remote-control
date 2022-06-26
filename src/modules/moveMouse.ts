import robot from 'robotjs';

const moveMouse = (direction: string, value: number) => {
  const pos = robot.getMousePos();
  let { x, y } = pos;
  if (direction === 'up') {
    y -= value;
  }
  if (direction === 'down') {
    y += value;
  }
  if (direction === 'left') {
    x -= value;
  }
  if (direction === 'right') {
    x += value;
  }
  if (x > 0 && y > 0) {
    robot.moveMouseSmooth(x, y)
    return (`mouse_${direction} ${direction === 'up' || direction === 'down' ? y : x}`);
  }
} 
export default moveMouse;