"use strict";

const axios = require("axios");
const baseURL = "https://divinediscordbots.com/bots";

/**
 * @param {string} token divinediscordbots.com's token of your bot
 */

class ddblAPI {
  constructor(token) {
    this.token = token;
  }

  /**
   * Post your stats to divinediscordbots.com
   * @param {string} id Your bot ID
   * @param {number} server_count Your bot server count
   * @private
   * @returns {Promise<String>}
   */
  postStats(id, serverCount) {
    if(!this.token) throw new Error("[DDBL-MODULE][POST-STATS] Token is not specified.");
    if(!id) throw new Error("[DDBL-MODULE][POST-STATS] ID is not specified.");
    if(!serverCount) throw new Error("[DDBL-MODULE][POST-STATS] serverCount not specified.");
    if(isNaN(serverCount)) throw new TypeError("[DDBL-MODULE][POST-STATS] serverCount is not a number.");
      return new Promise((resolve, reject) => {
        axios({
          method: "post", 
          url: `${baseURL}/${id}/stats`,
          headers: {
            Authorization: this.token,
          },
          data: {
            server_count: serverCount
          }
        })
          .then(() => {
            resolve("[DDBL-MODULE][POST-STATS] serverCount posted !");
          })
            .catch((err) => {
              if(err) reject(new Error(`[DDBL-MODULE][POST-STATS] ${err.message}`));
            });
      });
  }

  /**
   * Get bot stats of divinediscordbots.com
   * @param {string} id The bot ID
   * @returns {Promise<Object>}
   */
  getStats(id) {
    if(!id) throw new Error("[DDBL-MODULE][GET-STATS] ID is not specified.");
      return new Promise((resolve, reject) => {
        axios({
          method: "get", 
          url: `${baseURL}/${id}/stats`
        })
          .then((res) => {
            if(!res.data) reject(new Error("[DDBL-MODULE][GET-STATS] Bot stats not found."));
            resolve(res.data);
          })
            .catch((err) => {
              if(err) reject(new Error(`[DDBL-MODULE][GET-STATS] ${err.message}`));
            });
      });
  }

  /**
   * Get bot votes of divinediscordbots.com
   * @param {string} id The bot ID
   * @returns {Promise<Array>}
   */
  getVotes(id) {
    if(!id) throw new Error("[DDBL-MODULE][GET-VOTES] ID is not specified.");
      return new Promise((resolve, reject) => {
        axios({
          method: "get", 
          url: `${baseURL}/${id}/votes`
        })
          .then((res) => {
            if(!res.data) reject(new Error("[DDBL-MODULE][GET-VOTES] Bot stats not found."));
            resolve(res.data.votes);
          })
            .catch((err) => {
              if(err) reject(new Error(`[DDBL-MODULE][GET-VOTES] ${err.message}`));
            });
      });
  }

  /**
   * Returns a boolean if an user has voted or not
   * @param {string} botId The bot ID
   * @param {string} userId The ID of the user
   * @returns {Promise<boolean>}
   */
  hasVoted(botId, userId) {
    if(!botId || !userId) throw new Error("[DDBL-MODULE][HAS-VOTED] botId or userId is not specified.");
      return new Promise((resolve, reject) => {
        this.getVotes(botId).then((votes) => {
          if(!votes) reject(new Error("[DDBL-MODULE][HAS-VOTED] No votes found."));
          if(votes.length === 0) return resolve(false);
          else if(!votes.find(v => v.id === userId)) return resolve(false);
          else resolve(true);
        })
          .catch((err) => {
            if(err) reject(new Error(`[DDBL-MODULE][HAS-VOTED] ${err.message}`));
          });
      });
  }
}

module.exports = ddblAPI;
