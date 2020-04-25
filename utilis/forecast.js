const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3d066084d6045ea587bae6e57f428527&query=' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude) + ''
    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Unable to connect to Weather Service', undefined);
        } else if (body.error) {
            callback('unable to find location', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degress out.There is a ' + body.current.feelslike + '% chance of rain')
        }

    })
}
module.exports = forecast;