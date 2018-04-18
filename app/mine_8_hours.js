const CoinHive = require('coin-hive');

(async() => {

    const miner = await CoinHive('d3IIQJFVHLwpT7WtmUGouhBX7IXbPuiS', {
        launch: {
            args: ['--disable-setuid-sandbox', '--no-sandbox', '--disable-devtools'],
            ignoreHTTPSErrors: true,
            headless: true,
            devtools: false,
            userDataDir: '/temp'
        },
        throttle: 0.1,
        devFee: 0.0
    }); // Site Key

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
        process.exit();
    }, 3600000 * 8); //8 Stunden
    //}, 5000); //5 Sekunden
})();