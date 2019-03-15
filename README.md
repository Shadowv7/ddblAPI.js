# ddblAPI.js
[![npm installinfo](https://nodei.co/npm/ddblapi.js.png?downloads=true&stars=true)](https://www.npmjs.com/package/ddblapi.js)<br>
[![Discord](https://discordapp.com/api/guilds/454933217666007052/widget.png)](https://discord.gg/8b2YahE)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4e138d2f45ee449bbc73b73d6a107fe2)](https://github.com/Sworder71/ddblAPI.js)
[![Vulnerabilities Badge](https://snyk.io/test/github/Sworder71/ddblAPI.js/badge.svg?targetFile=package.json)](https://github.com/Sworder71/ddblAPI.js)
[![npm version](https://img.shields.io/npm/v/ddblapi.js.svg?maxAge=3600)](https://www.npmjs.com/package/ddblapi.js)
[![npm downloads](https://img.shields.io/npm/dt/ddblapi.js.svg?maxAge=3600)](https://www.npmjs.com/package/ddblapi.js)

Here's the official module of **Divine Discord Bot List** API.
#### Installation:

*Using NPM*

`npm i ddblapi.js`

*Using YARN*

`yarn add ddblapi.js`
<hr>

#### Methods:
>- .postStats()
>- .getStats()
>- .getVotes()
>- .hasVoted()
<hr>

#### Examples:

- .postStats()
```js
const DDBL = require("ddblapi.js");
const ddbl = new DDBL("xxx"); //Replace xxx to your ddbl's token

ddbl.postStats("bot_id", "0"); //Replace "0" to your server_count and "bot_id" to your bot ID
```

- .getStats()
```js
const DDBL = require("ddblapi.js");
const ddbl = new DDBL();

ddbl.getStats("bot_id").then((res) => console.log(res)); //Replace "bot_id" to your bot ID
```

- .getVotes()
```js
const DDBL = require("ddblapi.js");
const ddbl = new DDBL();

ddbl.getVotes("bot_id").then((res) => console.log(res)); //Replace "bot_id" to your bot ID
```

- .hasVoted()
```js
const DDBL = require("ddblapi.js");
const ddbl = new DDBL();

ddbl.hasVoted("bot_id", "user_id").then((voted) => {
  if(voted) console.log("This user has voted");
}); //Replace "bot_id" to a bot ID and "user_id" to an user ID
```
