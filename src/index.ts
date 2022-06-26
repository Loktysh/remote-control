import WebSocket, { WebSocketServer } from 'ws';
import moveMouse from './modules/moveMouse';
import getCoordinates from './modules/getCoordinates';
import drawCircle from './modules/drawCircle';
import drawRectangle from './modules/drawRectangle';
import takeScreenshot from './modules/takeScreenshot';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

const wss = new WebSocketServer({ port: (process.env.PORT as unknown as number) || 8080 });

wss.on('connection', function connection(ws, req) {
  const s = WebSocket.createWebSocketStream(ws, {
    encoding: 'utf8',
    decodeStrings: false,
  });
  console.log('Successfuly connected \nWebsocket parametres:', req.headers);
  s.on('data', async (data: any) => {
    const command = data.split('_')[0];
    const mode = data.split(/_| /)[1];
    const firstValue = parseInt(data.split(' ')[1]);
    const secondValue = parseInt(data.split(' ')[2]);
    let message = '';
    switch (command) {
      case 'mouse':
        message =
          mode === 'position' ? getCoordinates() : moveMouse(data.split(/_| /)[1], firstValue);
        break;
      case 'draw':
        if (mode === 'circle') {
          drawCircle(firstValue);
        }
        if (mode === 'square') {
           drawRectangle(firstValue, firstValue);
        }
        if (mode === 'rectangle') {
           drawRectangle(firstValue, secondValue);
        }
        message = data;
        break;
      case 'prnt':
        message = await takeScreenshot();
        break;

      default:
        break;
    }
    s.write(message+'\0');
    console.log(`Received: ${data}\nResult: ${message}\0`);
    
  }
  );
  s.on('end', (st:any) => {
    console.log('Close socket\0')
    s.destroy
  })
});

process.on('SIGINT', () => {
  process.stdout.write('Close socket\0');
  wss.close();
  process.exit(0);
});
