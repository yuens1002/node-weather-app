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
  return;
}

geocode.getGeocode(argv.a)
  .then (res => {
    darksky.getWeather({lat:res.Latitude,
      long:res.Longitude}, (errMsg, wResults) => {
        if (errMsg) {
          console.log(errMsg);
        } else {
          console.log(`the temperature at (${res.Address}) is ${wResults.temperature} F currently, but it feels like ${wResults.apparentTemperature} F`)
        }
      })
  })
  .catch (error => console.log(error));
