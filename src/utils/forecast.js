const request = require('request')

function forecast(latitude, longitude, callback) {
    const url = 'http://api.weatherstack.com/current?access_key=52537dc75a28e00e026fe3ee67b7d0a9&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, response) => {
        const { error: errorInfo, current, location } = response.body

        if (error) {
            callback('Unable to establish a connection with Weatherstack service!!!')
        } else if (errorInfo) {
            callback(errorInfo.info)
        } else {
            callback(undefined, {
                localTime: 'Local time: ' + location.localtime + '.',
                forecastData: 'Todays temperature is ' + current.temperature + ' degrees celsius out, although it feels like ' + current.feelslike + ' degrees celsius. Chance of raining is ' + current.precip + 'mm because the humidity is ' + current.humidity + '%. The sky is ' + current.cloudcover + '% clouded. Wind is moving at ' + current.wind_speed + 'kmh towards ' + current.wind_dir + ' at an angle of ' + current.wind_degree + ' degrees.',
                observationTime: 'This forcast was observed at ' + current.observation_time + '.'
            })
        }
    })
}

module.exports = forecast