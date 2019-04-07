const { ddblAPI } = require('../');
const ddbl = new ddblAPI('BOT_ID', 'API_KEY');

/* Example postStats usage */
ddbl.postStats('SERVER_COUNT')
    .then(console.log);

/* Example getStats usage */
ddbl.getStats('BOT_ID')
    .then(console.log);

/* Example postStats usage */
ddbl.getVotes()
    .then(console.log);

/* Example hasVoted24 usage */
ddbl.hasVoted24('USER_ID')
    .then(console.log);

/* Webhooks usage */
const { ddblWebhook } = require('../');
const ddbl = new ddblWebhook('PORT', 'AUTH', 'PATH');

ddbl.on('ready', (hook) => {
    console.log(hook);
});

ddbl.on('vote', (vote) => {
   console.log(vote);
});
