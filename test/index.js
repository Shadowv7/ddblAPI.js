const ddbl_api = require('../');
const ddbl = new ddbl_api('BOT_ID', 'API_KEY');


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
