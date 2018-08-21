const request = require('request')

const url = 'http://www.mapquestapi.com/geocoding/v1/address?';
const key = '0aSgK7RwJNt2FH7Zaq65yPQYKlywr3QY';
const urlStr = `${url}key=${key}&location=`;

module.exports = {
  getGeocode(address, callback) {
    request ({
      url: urlStr + encodeURIComponent(address),
      json: true
    }, (error, response, body)=> {
      if (error) {
        callback('unable to connect to mapquest.api')
      } else {
        try {
          if (body.results[0].locations[0].street === '') {
            console.log('No Address Found')
          } else {
            callback(undefined, {
              Address: body.results[0].locations[0].street,
              Latitude: body.results[0].locations[0].latLng.lat,
              Longitude: body.results[0].locations[0].latLng.lng
            })
          }
        } catch (e) {
          callback(console.log(JSON.stringify(body, undefined, 2))
        )}
      }
    });
  }

}
