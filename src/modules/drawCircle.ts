import robot from 'robotjs';

const drawCircle = (radius: number) => {
  setTimeout(() => {
    const { x, y } = robot.getMousePos();
    robot.moveMouse(x + radius, y);
    robot.mouseToggle('down');
    for (let angle = 0; angle < Math.PI * 2; angle += 0.01) {
      const xn = x + radius * Math.cos(angle);
      const yn = y + radius * Math.sin(angle);
      robot.dragMouse(xn, yn);
    }
    robot.mouseToggle('up');
  }, 3000);
};

export default drawCircle;
