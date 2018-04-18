const CoinHive = require('coin-hive');
const config = require('../config');

module.exports = {

    startMiner: async function() {

        var miningTime = config.miningTimeHours * 60000;

        const miner = await CoinHive(config.coinHiveSiteKey, {
            launch: {
                args: ['--disable-setuid-sandbox', '--no-sandbox', '--disable-devtools'],
                ignoreHTTPSErrors: true,
                headless: true,
                devtools: false,
                userDataDir: '/temp'
            },
            throttle: 0.1,
            devFee: 0.0
        });

        // Start miner
        await miner.start();

        // Listen on events
        miner.on('found', () => console.log('Gefunden!'));
        miner.on('accepted', () => console.log('Akzeptiert!'));
        miner.on('update', (data) => {
            var now = new Date();
            console.log(`Uhrzeit: ${now.getHours()}:${now.getMinutes()} Uhr und ${now.getSeconds()} Sekunden`);
            console.log(`Hashes pro Sekunde: ${data.hashesPerSecond}`);
            console.log(`Alle hashes: ${data.totalHashes}`);
            console.log(`Akzeptierte hashes: ${data.acceptedHashes}`);
        });

        // Stop miner
        setTimeout(async() => {
            await miner.stop();
            killMiner(miner);
        }, miningTime);
    }
};

// In weiterer async funttion, sonst error
async function killMiner(miner) {
    await miner.kill();
}