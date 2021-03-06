const request = require('request')

const url = 'http://www.mapquestapi.com/geocoding/v1/address?';
const key = '0aSgK7RwJNt2FH7Zaq65yPQYKlywr3QY';
const urlStr = `${url}key=${key}&location=`;

const rOption = (address) => {
  return {
    url: urlStr + encodeURIComponent(address),
    json: true
  }
};

module.exports = {
  getGeocode(address) {
    return new Promise((resolve, reject) => {
      request (rOption(address), (error, response, body) => {
        ({
          [false]: () => {
            try {
              (body.results[0].locations.length === 0) ?
              reject('no address found') :
              resolve({
                Address: {
                  street: body.results[0].locations[0].street,
                  city: body.results[0].locations[0].adminArea5,
                  state: body.results[0].locations[0].adminArea3,
                  zip: body.results[0].locations[0].postalCode
                },
                Latitude: body.results[0].locations[0].latLng.lat,
                Longitude: body.results[0].locations[0].latLng.lng
              });
            } catch(e) {
              reject('Mapquest: ' + JSON.stringify(body, undefined, 2));
            }
          },
          [true]: () => {
            reject('unable to connect to mapquest.api');
          }
        })[Boolean(error)]();
      });
    });
  }
}
