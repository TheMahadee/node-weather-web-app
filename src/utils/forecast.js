const request = require('request')

function forecast(latitude, longitude, callback) {
    const url = 'http://api.weatherstack.com/current?access_key=52537dc75a28e00e026fe3ee67b7d0a9&query='+latitude+','+longitude+'&units=m'
    
    request({ url, json: true }, (error, response) => {
        const { error: errorInfo, current} = response.body
        
        if (error) {
            callback('Unable to establish a connection with Weatherstack service!!!')
        } else if (errorInfo) {
            callback(errorInfo.info)
        } else {
            callback(undefined, 'Todays temperature is ' + current.temperature + ' degrees out, although it feels like ' + current.feelslike + ' degrees. Chance of raining is ' + current.precip + '%')
        }
    })
}

module.exports = forecast