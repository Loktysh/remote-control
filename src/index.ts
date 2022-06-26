import WebSocket, { WebSocketServer } from 'ws';
import moveMouse from './modules/moveMouse';
import getCoordinates from './modules/getCoordinates';
import drawCircle from './modules/drawCircle';
import drawRectangle from './modules/drawRectangle'
import takeScreenshot from './modules/takeScreenshot';
import dotenv from 'dotenv';
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') });

const wss = new WebSocketServer({ port: process.env.PORT as unknown as number || 8080 });

wss.on('connection', function connection(ws, req) {
  const s = WebSocket.createWebSocketStream(ws, { encoding: 'utf8', autoDestroy: false, decodeStrings: false });
  console.log('Successfuly connected \nWebsocket parametres:', req.headers);
  s.on('data', async (data: any) => {
    // console.log('received: %s', data);
    // s.write(`${data}`, 'utf-8');
    // moveMouse(data.split(/_| /)[1], parseInt(data.split(' ')[1]));
    // s.write(getCoordinates(), 'utf-8');
    // drawCircle(50);
    // drawRectangle(parseInt(data.split(' ')[1]),parseInt(data.split(' ')[2]) )
    // s.write(await takeScreenshot(), 'utf-8');
    await takeScreenshot()
  });
  // ws.on('message', function message(data) {
  //   // robot.setMouseDelay(2);
  //   // for (let x = 0; x < width; x++) {
  //   //   let y = height * Math.sin((twoPI * x) / width) + height;
  //   //   robot.moveMouse(x, y);
  //   // }
  //   ws.send(`${data}`)
  //   console.log('received: %s', data);
  // });
  // duplex.on('data', (data: any) => {
  //   console.log('received: %s', data);
  //   duplex.write(data);
  // });
  // duplex.on('drain', (data: any) => {
  //   console.log('REDURN: %s', data);
  // });
});