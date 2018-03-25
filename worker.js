var fs = require('fs'),
  SCWorker = require('socketcluster/scworker'),
  express = require('express'),
  serveStatic = require('serve-static'),
  path = require('path'),
  morgan = require('morgan'),
  config = JSON.parse(fs.readFileSync('./config.json')),
  healthChecker = require('sc-framework-health-check');

class Worker extends SCWorker {
  run() {
    console.log('   >> Worker PID:', process.pid);
    var environment = this.options.environment;

    var app = express();
    env('.env')

    var db = require('./models/db')
        , assert = require('assert');

    var url = 'mongodb://localhost:27017';

    db.connect(url, (err, db => {
        asset.equal(null, err);
        console.log("Connected correctly to server");

    }))
    process.env = config
    var pool = db.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_DATABASE
    })
    process.pool = pool

    var httpServer = this.httpServer;                           
    var scServer = this.scServer;

    app.set('views', __dirname + '/views')
    app.set('view engine', 'jade')
    app.use(serveStatic(path.resolve(__dirname, 'public')))

    httpServer.on('request', app)

    var Controllers = require('./controllers/Controllers')

    // Routes
    app.use("/", require('./routes/home.js'))
    app.use("/admin", require('./routes/admin.js'))

    app.get("/status", function (req, res) {
        res.json({ success: 1, message: 'Server is live!' })
    })

    // Handle All Other Express Routes
    app.get('*', function (req, res) {
        res.redirect('/')
    })

    scServer.on('connection', function (client) {
        console.log('Client', client.id, 'connected to worker', worker.id)

        client.on('messages', function (data, respond) {
            try { Controllers[data['controller']][data['method']](client, data, respond) }
            catch (err) {
                if (data.controller) {
                    console.log(data['controller'] + '.' + data['method'] + ' vue-route failed!')
                    console.log(err)
                    client.emit('response', {
                        success: 0,
                        message: data['controller'] + '-' + data['method'] + ' is not implemented yet.'
                    })
                }
            }
        })

    })

    if (environment === 'dev') {
      // Log every HTTP request. See https://github.com/expressjs/morgan for other
      // available formats.
      app.use(morgan('dev'));
    }
    app.use(serveStatic(path.resolve(__dirname, 'public')));

    // Add GET /health-check express route
    healthChecker.attach(this, app);

    httpServer.on('request', app);

    var count = 0;

    /*
      In here we handle our incoming realtime connections and listen for events.
    */
    scServer.on('connection', function (socket) {

      // Some sample logic to show how to handle client events,
      // replace this with your own logic

      socket.on('sampleClientEvent', function (data) {
        count++;
        console.log('Handled sampleClientEvent', data);
        scServer.exchange.publish('sample', count);
      });

      var interval = setInterval(function () {
        socket.emit('rand', {
          rand: Math.floor(Math.random() * 5)
        });
      }, 1000);

      socket.on('disconnect', function () {
        clearInterval(interval);
      });
    });
  }
}

new Worker();
