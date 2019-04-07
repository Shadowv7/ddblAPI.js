'use strict';

const axios = require('axios');
const baseURL = 'https://divinediscordbots.com/bot';

/**
 * @param {Snowflake} bot_id Your Discord Bot ID
 * @param {string} api_key divinediscordbots.com's token of your bot
 */
class ddblAPI {
    constructor(bot_id, api_key) {
        // Bot ID
        this.bot_id = bot_id;
        // Divine Discord Bot List Token API
        this.api_key = api_key;
        // Request header
        this.headers = {
            Authorization: (this.api_key ? this.api_key : null)
        };
    }

    /**
     * Post your stats to divinediscordbots.com
     * @param {number} server_count Your bot server count
     * @returns {Promise<String>}
     */
    postStats(server_count) {
        return new Promise((resolve, reject) => {
            if (!this.api_key) { reject(new Error('[DDBL-MODULE][POST-STATS] API_KEY isn\'t specified on the constructor.')); }
            if (!this.bot_id) { reject(new Error('[DDBL-MODULE][POST-STATS] BOT_ID isn\'t specified on the constructor.')); }
            if (!server_count) { reject(new Error('[DDBL-MODULE][POST-STATS] serverCount not specified.')); }
            else if (isNaN(server_count)) { reject(new TypeError('[DDBL-MODULE][POST-STATS] serverCount isn\'t a number.')); }
                this._request('post', { bot_id: this.bot_id, endpoint: 'stats', data: { server_count } })
                    .then(() => {
                        resolve('[DDBL-MODULE][POST-STATS] serverCount posted !');
                    })
                    .catch((err) => {
                        if (err) { reject(new Error('[DDBL-MODULE][POST-STATS] ' + err.message)); }
                    });
        });
    }

    /**
     * Get bot stats of divinediscordbots.com
     * @param {Snowflake} bot_id The bot ID
     * @returns {Promise<Object>}
     */
    getStats(bot_id) {
        return new Promise((resolve, reject) => {
            if (!bot_id) { reject(new Error('[DDBL-MODULE][GET-STATS] ID isn\'t specified.')); }
                this._request('get', { bot_id: bot_id, endpoint: 'stats' })
                    .then((res) => {
                        if (!res) { reject(new Error('[DDBL-MODULE][GET-STATS] no bot stats found.')); }
                        resolve(res);
                    })
                    .catch((err) => {
                        if (err) { reject(new Error('[DDBL-MODULE][GET-STATS] ' + err.message)); }
                    });
        });
    }

    /**
     * Get bot votes of divinediscordbots.com
     * @param {string} query_filter Last votes before the XXX hours
     * @returns {Promise<Array>}
     */
    getVotes(query_filter) {
        return new Promise((resolve, reject) => {
            let endpoint_filter = '';
            if (!this.bot_id) { reject('[DDBL-MODULE][POST-STATS] BOT_ID isn\'t specified on the constructor.'); }
            if (!query_filter) { endpoint_filter = 'votes'; }
            else { endpoint_filter = 'votes?filter=' + query_filter; }
                this._request('get', { bot_id: this.bot_id, endpoint: endpoint_filter })
                    .then((res) => {
                        resolve(res.votes);
                    })
                    .catch((err) => {
                        if (err) { reject(new Error('[DDBL-MODULE][GET-VOTES] ' + err.message)); }
                    });
        });
    }

    /**
     * Returns a boolean if an user has voted or not the last 24 hours.
     * @param {Snowflake} user_id The ID of the user
     * @returns {Promise<boolean>}
     */
    hasVoted24(user_id) {
        return new Promise((resolve, reject) => {
            if (!this.bot_id) { reject(new Error('[DDBL-MODULE][HAS-VOTED] bot_id ins\'t specified on the constructor.')); }
            if (!user_id) { reject(new Error('[DDBL-MODULE][HAS-VOTED] userId isn\'t specified.')); }
                this.getVotes(this.bot_id, '24')
                    .then((votes) => {
                        if (!votes || votes.length < 0) { reject(new Error('[DDBL-MODULE][HAS-VOTED] no vote found.')); }
                        resolve(Boolean(votes.find((v) => v.id === user_id)));
                    })
                    .catch((err) => {
                        if (err) { reject(new Error('[DDBL-MODULE][HAS-VOTED] ' + err.message)); }
                    });
        });
    }

    /**
     * Creates a request to the API
     * @param {string} method The type of the request
     * @param {Object} options Options of the request (bot_id, endpoint, data)
     * @private
     * @returns {Promise<Object>}
     * @example
     * this._request('post', { bot_id: '240508683455299584', endpoint: 'stats', data: { server_count: '1234' } });
     */
    _request(method, options) {
        return new Promise((resolve, reject) => {
            axios({ method: method, url: baseURL + '/' + options.bot_id + '/' + options.endpoint, headers: this.headers, data: (options.data ? options.data : null) })
                .then((res) => {
                    if (res.data) { resolve(res.data); }
                    else { reject(new Error('An error has occured: No data found.')); }
                })
                .catch((err) => {
                    if (err) { reject(new Error('An error has occured: ' + err.message)); }
                });
        });
    }
}

module.exports = ddblAPI;
