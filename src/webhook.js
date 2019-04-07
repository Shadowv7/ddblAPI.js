'use strict';

const EventEmitter = require('events');
const app = require('express')();
const bodyparser = require('body-parser');

/**
 * @param {number} port The port where listening the server
 * @param {string} auth divinediscordbots.com's token of your bot
 * @param {string} path The path where DDBL will post data
 */
class ddblAPIWebhook extends EventEmitter {
    constructor(port, auth, path) {
        super();
        this.port = port || 3000;
        if (!auth) { throw new Error('[DDBL-MODULE][WEBHOOK] You must include your API_KEY of divinediscordbots.com.'); }
        this.auth = auth;
        this.path = path || '/webhook';
        this._startServer();
    }

    _startServer() {
        const checkAuth = (req, res, next) => {
            const auth = req.get('Authorization');
            if (auth && auth === this.auth) {
                next();
            } else {
                return res.status(401).json({ error: '401 Unauthorized', message: 'Authorization Header missing or invalid token.' });
            }
        };

        app
            .use(bodyparser.json())
            .use(bodyparser.urlencoded({ extended: true }));
        app
            .post(this.path, [checkAuth], (req, res, next) => {
                this.emit('vote', req.body);
            });
        app
            .listen(this.port, (err) => {
                if (!err) { this.emit('ready', { port: this.port, auth: this.auth, path: this.path }); }
            });
    }
}

module.exports = ddblAPIWebhook;
