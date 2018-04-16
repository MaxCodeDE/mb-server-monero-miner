# mb-server-monero-miner
A monero miner for my server, that starts mining at night when server is unused

Installation
============

    npm install
     
    
Run
============

* Start server: `npm start`
* Run dev livereload: `npx nodemont`

Config.js
============

```javascript
module.exports = {
    'miningTimeHours': 10, // time in hours as long as the miner works
    'miningStartingDayHour': 8, // hour of the day in which the miner should begin
    'coinHiveSiteKey': 'd3IIQJFVHLwpT7WtmUGouhBX7IXbPuiS', // CoinHive sitekey
};
```
