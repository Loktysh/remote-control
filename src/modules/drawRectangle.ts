import robot from 'robotjs';

const drawRectangle = (width: number, height: number = width ) => {
  setTimeout(() => {
    let { x, y } = robot.getMousePos(); 
    robot.mouseToggle('down');
    robot.moveMouseSmooth(x + width, y);
    robot.moveMouseSmooth(x + width, y + height);
    robot.moveMouseSmooth(x, y + height);
    robot.moveMouseSmooth(x, y);
    robot.mouseToggle('up');
  }, 3000);
};

export default drawRectangle;
