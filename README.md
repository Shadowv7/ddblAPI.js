# ddblAPI.js
[![npm installinfo](https://nodei.co/npm/ddblapi.js.png?downloads=true&stars=true)](https://www.npmjs.com/package/ddblapi.js)<br>
[![Discord](https://discordapp.com/api/guilds/454933217666007052/widget.png)](https://discord.gg/8b2YahE)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4e138d2f45ee449bbc73b73d6a107fe2)](https://github.com/Sworder71/ddblAPI.js)
[![Vulnerabilities Badge](https://snyk.io/test/github/Sworder71/ddblAPI.js/badge.svg?targetFile=package.json)](https://github.com/Sworder71/ddblAPI.js)
[![npm version](https://img.shields.io/npm/v/ddblapi.js.svg?maxAge=3600)](https://www.npmjs.com/package/ddblapi.js)
[![npm downloads](https://img.shields.io/npm/dt/ddblapi.js.svg?maxAge=3600)](https://www.npmjs.com/package/ddblapi.js)

Here's the official module of **Divine Discord Bot List** API in JavaScript.
#### Installation:

Using **npm**

`npm i ddblapi.js`

Using **yarn**

`yarn add ddblapi.js`
<hr>

#### Methods:
- .postStats()
- .getStats()
- .getVotes()
- .hasVoted24()
<hr>

#### Examples:

Methods usage:
```js
const { ddblAPI } = require('ddblapi.js');
const ddbl = new ddblAPI('BOT_ID', 'API_KEY');

```

- .postStats()
```js
ddbl.postStats('SERVER_COUNT')
    .then(console.log);
```

- .getStats()
```js
ddbl.getStats('BOT_ID')
    .then(console.log);
```

- .getVotes()
```js
ddbl.getVotes('BOTID')
    .then(console.log);
```

- .hasVoted24()
```js
ddbl.hasVoted24('USER_ID')
    .then(console.log);
```

Webhooks usage:
```js
const { ddblWebhook } = require('ddblapi.js');
const ddbl = new ddblWebhook('PORT', 'AUTH', 'PATH');

ddbl.on('ready', (hook) => {
    console.log(hook);
});

ddbl.on('vote', (vote) => {
   console.log(vote);
});
```
