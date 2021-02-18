const request = require('request')

function geocode(address, callback) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGhlbWFoYWRlZSIsImEiOiJja2t5M2s3NHMwNHdqMnFxbHh1ZDFsNnVvIn0.Suj4W_cTkUyNkKKpDpgtEg&limit=1'

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect with Mapbox service!!!', undefined)
        } else {
            const { features: geoData, message } = response.body
            if (message) {
                callback(message, undefined)
            } else if (geoData.length === 0) {
                callback('Unable to find the location searched for, please try again!', undefined)
            } else {
                callback(undefined, {
                    latitude: geoData[0].center[1],
                    longitude: geoData[0].center[0],
                    location: geoData[0].place_name
                })
            }
        }
    })
}

module.exports = geocode