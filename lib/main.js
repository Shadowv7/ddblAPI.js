const http = require('https');
const pageURL = `https://divinediscordbots.com/bots/{id}/stats`;


  /**
   * @param {string} token bots-discord.tk's token of your bot
   */

class divinedblAPI {

constructor(token){
    
    this.token = token;
    
}

  /**
   * Post your stats to bots-discord.tk
   * @param {string} id Your bot ID
   * @param {number} server_count Your bot server count
   * @private
   * @returns {Promise<Object>}
   */

async postBotID(id, server_count) {

        var options = {
            hostname: 'bots-discord.tk',
            path: `/bots/${id}/stats`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 Authorization: this.token
            }
          };

          var req = await http.request(options, function(res) {

            const { statusCode } = res;

            if (statusCode !== 200) {

                res.resume();

                console.log(`[divinedblAPI][POST] An error has occurred: ${statusCode}`);
            }

               res.setEncoding('utf8');

            res.on('data', function (body) {

              console.log('[divinedblAPI][POST][Status 200] Response: ' + body);

            });

          });

          req.on('error', function(e) {

            console.log(`[divinedblAPI][POST] An error has occurred: ${e.message}`);

          });

          req.write(`{"server_count": ${server_count}}`);

          req.end();
        
    }
}
    

module.exports = divinedblAPI;
