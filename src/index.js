require('dotenv').config();

const cluster = require('cluster');
const os = require('os');
const process = require('process');
const app = require('./app');

// if (cluster.isMaster) {
//   const numWorkers = os.cpus().length;

//   console.log(`Master cluster setting up ${numWorkers} workers...`);

//   // eslint-disable-next-line no-plusplus
//   for (let i = 0; i < numWorkers; i++) {
//     cluster.fork();
//   }

//   cluster.on('online', (worker) => {
//     console.log(`Worker ${worker.process.pid} is online`);
//   });

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(
//       `Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`,
//     );
//     console.log('Starting a new worker');
//     cluster.fork();
//   });
// } else {
//   console.log(`worker : ${process.pid}`);

//   app.init();
// }

app.init();
