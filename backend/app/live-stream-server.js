'use strict';

const NodeMediaServer = require('node-media-server').NodeMediaServer;

const eventModel = require('./models/event');

class LiveStreamServer {

    static async setAvailabilityFlag(eventId, liveStreamAvailable) {

        const event = await eventModel.findOne({_id: eventId});

        if (!event) {

            return console.log(`LiveStreamServer::setAvailabilityFlag: Event was not found by id: ${eventId}`);
        }

        console.log(`LiveStreamServer: Live stream is ${liveStreamAvailable ? 'available' : 'not available'} for event "${event.name}"`);

        event.liveStreamAvailable = liveStreamAvailable;

        await event.save();
    }

    constructor(config) {

        this.config = config;
    }

    bootstrap() {

        const nms = new NodeMediaServer(this.config);

        nms.on('postPublish', async (id, streamPath, args) => {

            console.log('[LiveStreamServer postPublish]', `id=${id} StreamPath=${streamPath} args=${JSON.stringify(args)}`);

            // const eventId = streamPath.match(/\/live\/(.*)/)[1];
            //
            // await LiveStreamServer.setAvailabilityFlag(eventId, true);
        });

        nms.on('donePublish', async (id, streamPath, args) => {

            console.log('[LiveStreamServer donePublish]', `id=${id} StreamPath=${streamPath} args=${JSON.stringify(args)}`);

            // const eventId = streamPath.match(/\/live\/(.*)/)[1];
            //
            // await LiveStreamServer.setAvailabilityFlag(eventId, false);
        });

        nms.run();
    }
}

module.exports = LiveStreamServer;