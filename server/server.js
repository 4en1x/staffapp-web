const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const WORKERS = process.env.WEB_CONCURRENCY || os.cpus().length;

  for (let i = 0; i < WORKERS; i += 1) {
    cluster.fork();
  }
} else {
  require('./app.js');
}

cluster.on('exit', (worker) => {
  console.log(`Worker ${worker.id} died. Restoring...`);
  cluster.fork();
});
