'use strict';

const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const morgan     = require('morgan');

require('express-async-errors');

const userModel = require('./models/user');

const userController                = require('./controllers/user');
const residentApplicationController = require('./controllers/resident-application');
const residentController            = require('./controllers/resident');
const zoneController                = require('./controllers/zone');
const placeController               = require('./controllers/place');
const eventController               = require('./controllers/event');

const LiveStreamServer = require('./live-stream-server');

const PORT = 3000;

class Loader {

    async bootstrap() {

        await this.initDatabase();

        this.initHttp();

        this.initLiveStreamServer();
    }

    async initDatabase() {

        try {
            await mongoose.connect('mongodb://127.0.0.1/h', {useNewUrlParser: true});
        } catch (e) {
            console.log(e);
        }

        console.log(`MongoDB connected`);

        // Add super manager account
        await this.addSuperManager();
    }

    initHttp() {

        const app = express();

        app.use(morgan('combined'));

        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());

        app.post('/signin', (req, res, next) => userController(req, res, next, 'signin'));
        app.post('/resident-applications', (req, res, next) => residentApplicationController(req, res, next, 'create'));

        app.use(expressJwt({secret: 'JWT_SECRET_TOKEN_HERE'}));

        app.get('/resident-applications', (req, res, next) => residentApplicationController(req, res, next, 'list'));
        app.get('/resident-applications/:id', (req, res, next) => residentApplicationController(req, res, next, 'get'));
        app.put('/resident-applications/:id/:action', (req, res, next) => residentApplicationController(req, res, next, 'action'));
        app.delete('/resident-applications/:id', (req, res, next) => residentApplicationController(req, res, next, 'delete'));

        app.post('/residents', (req, res, next) => residentController(req, res, next, 'create'));
        app.get('/residents', (req, res, next) => residentController(req, res, next, 'list'));
        app.get('/residents/:id', (req, res, next) => residentController(req, res, next, 'get'));
        app.put('/residents/:id', (req, res, next) => residentController(req, res, next, 'update'));
        app.delete('/residents/:id', (req, res, next) => residentController(req, res, next, 'delete'));

        app.post('/zones', (req, res, next) => zoneController(req, res, next, 'create'));
        app.get('/zones', (req, res, next) => zoneController(req, res, next, 'list'));
        app.get('/zones/:id', (req, res, next) => zoneController(req, res, next, 'get'));
        app.put('/zones/:id', (req, res, next) => zoneController(req, res, next, 'update'));
        app.delete('/zones/:id', (req, res, next) => zoneController(req, res, next, 'delete'));

        app.post('/places', (req, res, next) => placeController(req, res, next, 'create'));
        app.get('/places', (req, res, next) => placeController(req, res, next, 'list'));
        app.get('/places/:id', (req, res, next) => placeController(req, res, next, 'get'));
        app.put('/places/:id', (req, res, next) => placeController(req, res, next, 'update'));
        app.delete('/places/:id', (req, res, next) => placeController(req, res, next, 'delete'));

        app.post('/events', (req, res, next) => eventController(req, res, next, 'create'));
        app.get('/events', (req, res, next) => eventController(req, res, next, 'list'));
        app.get('/events/:id', (req, res, next) => eventController(req, res, next, 'get'));
        app.put('/events/:id', (req, res, next) => eventController(req, res, next, 'update'));
        app.delete('/events/:id', (req, res, next) => eventController(req, res, next, 'delete'));

        app.use((err, req, res, next) => {

            if (err.name === 'UnauthorizedError') {

                return res.status(401).send('Access token is missing or invalid');
            }

            console.error(err.stack);

            res.status(500).send({
                error: err.message // TODO: Dev env only
            });
        });

        app.listen(PORT, () => console.log(`H app listening on port ${PORT}!`));
    }

    initLiveStreamServer() {

        const config = {
            rtmp: {
                port: 1935,
                chunk_size: 60000,
                gop_cache: true,
                ping: 60,
                ping_timeout: 30
            },
            http: {
                port: 8000,
                allow_origin: '*',
                mediaroot: './media'
            },
            trans: {
                // ffmpeg: '/usr/local/bin/ffmpeg',
                ffmpeg: '/usr/bin/ffmpeg',
                tasks: [
                    {
                        app: 'live',
                        hls: true,
                        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                        // dash: false,
                        // dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
                    }
                ]
            },
            logType: 4
        };

        const liveStreamServer = new LiveStreamServer(config);

        liveStreamServer.bootstrap();
    }

    async addSuperManager() {

        const superManagerData = {
            name: 'Super Manager',
            email: 'super-manager@h.com',
            password: 'SUPER_PASSWORD',
            type: 'manager'
        };

        if (await userModel.count({email: superManagerData.email}) === 0) {

            await userModel.insert(superManagerData);
        }
    }
}

const loader = new Loader();

loader.bootstrap();
