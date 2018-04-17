const CoinHive = require('coin-hive');
const miner = require('./miner');
const config = require('../config');

console.log('App startet...');

timeChecker();

function timeChecker() {
    var now = new Date();
    var nowHours = now.getHours();
    var miningTime = config.miningTimeHours*60000;
    console.log(`Gemint wird für ${config.miningTimeHours} Stunden(${miningTime}ms) ab ${config.miningStartingDayHour} Uhr.`);

    if (nowHours >= config.miningStartingDayHour) {
        console.log('Miner wird versucht zu starten...');
        miner.startMiner();
        setTimeout(() => timeChecker(), miningTime + 30000); //miningTime + 10 Sekunden
    } else {
        console.log('Miner läuft erst später.');
        setTimeout(() => timeChecker(), 60000); //1 Stunde
    }
}