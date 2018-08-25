const yargs = require('yargs');
const axios = require('axios');
const readline = require('readline');

const MQurl = 'http://www.mapquestapi.com/geocoding/v1/address?';
const MQkey = '0aSgK7RwJNt2FH7Zaq65yPQYKlywr3QY';
const MQurlStr = `${MQurl}key=${MQkey}&location=`;
const DSkey = 'b431925c1daa955d88b36b219e6fb858';
const DSurl = 'https://api.darksky.net/forecast/';
const results = {};


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

axios.get(MQurlStr+argv.a).then(res => {
  results.mqRes = {
    Address: {
      street: res.data.results[0].locations[0].street,
      city: res.data.results[0].locations[0].adminArea5,
      state: res.data.results[0].locations[0].adminArea3,
      zip: res.data.results[0].locations[0].postalCode
    },
    Latitude: res.data.results[0].locations[0].latLng.lat,
    Longitude: res.data.results[0].locations[0].latLng.lng
  };
  return axios.get(`${DSurl}${DSkey}/${results.mqRes.Latitude},${results.mqRes.Longitude}`);
}).then(res => {
  results.dsRes = {
    weather: res.data.currently
  };
  console.log(`the temperature at ${results.mqRes.Address.street} ${results.mqRes.Address.city}, ${results.mqRes.Address.state} ${results.mqRes.Address.zip} is ${results.dsRes.weather.temperature} F currently, but it feels like ${results.dsRes.weather.apparentTemperature} F`)
}).catch(error => {
  if (error.code === 'ENOTFOUND') {
    console.log('can\'t connect to api' + ' ' + error.host);
  } else {
    console.log(`check the api key used here: ${error.response.config.url}`);
  }
});
