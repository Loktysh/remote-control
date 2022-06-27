import robot from 'robotjs';
import Jimp from 'jimp/es';

const takeScreenshot = async () => {
  const { x, y } = robot.getMousePos();
  let capture = robot.screen.capture(x - 100, y - 100, 200, 200);
  let image = new Jimp(200, 200);
  let red: number, green: number, blue: number;
  capture.image.forEach((byte: number, i: number) => {
    switch (i % 4) {
      case 0: return blue = byte
      case 1: return green = byte
      case 2: return red = byte
      case 3: 
        image.bitmap.data[i - 3] = red
        image.bitmap.data[i - 2] = green
        image.bitmap.data[i - 1] = blue
        image.bitmap.data[i] = 255
    }
  })
  // image.bitmap.data = capture.image;
  const base64 = await image.getBufferAsync(Jimp.MIME_PNG);
  return `prnt_scrn ${base64.toString('base64')}`;
};

export default takeScreenshot;
