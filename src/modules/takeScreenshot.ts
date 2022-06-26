import robot from 'robotjs';
import Jimp from 'jimp/es';

const takeScreenshot = async () => {
  // setTimeout(() => {
  //   let { x, y } = robot.getMousePos();
  //   robot.mouseToggle('down');
  //   robot.moveMouseSmooth(x + width, y);
  //   robot.moveMouseSmooth(x + width, y + height);
  //   robot.moveMouseSmooth(x, y + height);
  //   robot.moveMouseSmooth(x, y);
  //   robot.mouseToggle('up');
  // }, 3000);
  let capture = robot.screen.capture(0, 0, 200, 200);
  let image = new Jimp(200, 200);
  image.bitmap.data = capture.image;
  const base64 = await image.getBufferAsync(Jimp.MIME_PNG);
  console.log(base64);
  return `prnt_scrn ${base64.toString('base64')}`;
};

export default takeScreenshot;
