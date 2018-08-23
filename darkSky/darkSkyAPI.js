const request = require('request');

const key = 'b431925c1daa955d88b36b219e6fb858';
const url = 'https://api.darksky.net/forecast/';
const rOption = (cords) => {
  return {
    url: `${url}${key}/${cords.Latitude},${cords.Longitude}`,
    json: true,
    gzip: true
  }
};

module.exports = {
  getWeather(geoInfo) {
    return new Promise((resolve, reject) => {
      request (rOption(geoInfo), (error, response, body) => {
        error ?
        reject('can\'t connect to darksky api') :
        response.statusCode === 200 ?
        resolve({
          weather: body.currently,
          address: geoInfo.Address
        }) :
        reject('check darksky api key');
      });
    });
  }
}
