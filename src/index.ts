import WebSocket, { WebSocketServer } from 'ws';
import moveMouse from './modules/moveMouse';
import getCoordinates from './modules/getCoordinates';
import drawCircle from './modules/drawCircle';
import drawRectangle from './modules/drawRectangle'
import takeScreenshot from './modules/takeScreenshot';
const wss = new WebSocketServer({ port: 8080 });
// const duplex = WebSocket.createWebSocketStream(wss, { encoding: 'utf8' });

// duplex.pipe(process.stdout);
// process.stdin.pipe(duplex);
wss.on('connection', function connection(ws) {
  const s = WebSocket.createWebSocketStream(ws, { encoding: 'utf8', autoDestroy: false,  decodeStrings: false });
  s.on('data', async (data: any) => {
    // console.log('received: %s', data);
    // s.write(`${data}`, 'utf-8');
    // moveMouse(data.split(/_| /)[1], parseInt(data.split(' ')[1]));
    // s.write(getCoordinates(), 'utf-8');
    // drawCircle(50);
    // drawRectangle(parseInt(data.split(' ')[1]),parseInt(data.split(' ')[2]) )
    s.write(await takeScreenshot(), 'utf-8');
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

// import http from 'http';
// import url from 'url';
// import dotenv from 'dotenv';
// import path from 'path';
// import usersDB from './mock/users';
// import UserController from './controller';
// import cluster from 'node:cluster';
// import { cpus } from 'node:os';
// import process from 'node:process';
// dotenv.config({ path: path.join(process.cwd(), '.env') });
// interface ProcessEnv {
//   [key: string]: string | undefined;
// }
// import { IUser } from './types/interfaces';

// dotenv.config({
//   path: path.join(process.cwd(), '.env'),
// });

// interface IRoutes {
//   [key: string]: any;
// }
// let routes: IRoutes = {
//   '/users': (req:any,res:any)=>new UserController(usersDB).Users(req, res ),
//   '/users/(.*)': (req:any,res:any,method:string,param:any)=>new UserController(usersDB).UserById(req, res),
// };
// let router = (client: { req: any; res: any }): void => {
//   let { req, res } = client;
//   let users = usersDB;
//   const pathUrl = url.parse(req.url, true).path;
//   if (pathUrl in routes) {
//     routes[pathUrl](req, res);
//     return null;
//   }
//   if (!routes[req.url]) {
//     const route = Object.keys(routes).find((r, i) => {
//       return !!pathUrl.match(new RegExp(`^${r}$`, 'i'));
//     });
//     if (route) {
//       let pathHandler = routes[route];
//       pathHandler(req, res);
//     } else {
//       res.writeHead(404).end('HTTP/1.1 404 Non-existing endpoint\r\n\r\n');
//     }
//   }
// };
// const numCPUs = cpus().length;
// if (process.argv
//   .filter(e => e.startsWith('multi'))[0].split('=')[1] == 'true') {
//     if (cluster.isPrimary) {
//       console.log(`Primary ${process.pid} is running`);
//       for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//       }

//       cluster.on('exit', (worker, code, signal) => {
//         console.log(`worker ${worker.process.pid} died`);
//       });
//     } else {
//       const server = http.createServer((req, res) => {
//         router({ req, res });
//       });
//       server.on('clientError', (err, socket) => {
//         socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
//       });
//       server.listen(process.env.PORT || 8000, () => {
//         console.log('Server listening on port:', process.env.PORT || 8001);
//       });
//       console.log(`Worker ${process.pid} started`);
//     }
// } else {
//   const server = http.createServer((req, res) => {
//     router({ req, res });
//   });
//   server.on('clientError', (err, socket) => {
//     socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
//   });
//   server.listen(process.env.PORT || 8000, () => {
//     console.log('Server listening on port:', process.env.PORT || 8001);
//   });
//   }
