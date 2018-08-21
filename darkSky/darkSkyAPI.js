const request = require('request');

const key = 'b431925c1daa955d88b36b219e6fb858'
const url = 'https://api.darksky.net/forecast/'

module.exports = {
  getWeather(cords, callback) {
    request ({
      url: `${url}${key}/${cords.lat},${cords.long}`,
      json: true,
      gzip: true
    }, (error, response, body) => {
      if (response.statusCode === 200 && !error) {
        callback(undefined, body.currently)
      } else if (response.statusCode !== 200) {
        callback('check darksky api key')
      } else {
        callback('can\'t connect to darksky api')
      }
    })
  }
}
