import robot from 'robotjs';

const drawRectangle = (width: number, height: number ) => {
  setTimeout(() => {
    let { x, y } = robot.getMousePos();
    robot.setMouseDelay(100);
    robot.mouseToggle('down');
    robot.moveMouseSmooth(x + width, y);
    robot.moveMouseSmooth(x + width, y + height);
    robot.moveMouseSmooth(x, y + height);
    robot.moveMouseSmooth(x, y);
    robot.mouseToggle('up');
  }, 1000);
};

export default drawRectangle;
