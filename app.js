const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const darksky = require('./darkSky/darkSkyAPI');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

//exit program if an empty string for addrss is submitted
if (argv.a === '') {
  console.log('An address can not be blink or empty');
} else {
  geocode.getGeocode(argv.a).then (res => {
    return darksky.getWeather(res);
  }).then (res => {
    console.log(`the temperature at (${res.address}) is ${res.weather.temperature} F currently, but it feels like ${res.weather.apparentTemperature} F`)
  }).catch (error => console.log(error));
}
