const request = require('request');
const geocode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoibGlvbmVsa2FuZGVrd2UiLCJhIjoiY2s5N3N4bHRjMDJpbjNocGxwNHI5eWxuZSJ9.2hq6UoDF02HPl_Mg7sS7wQ&limit=3'
    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Unable to connect to location', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find locations.Try another search', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name,
            })
        }
    })

}
module.exports = geocode