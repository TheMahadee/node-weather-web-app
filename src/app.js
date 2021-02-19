//Core
const path = require('path')
    //NPM
const express = require('express')
const hbs = require('hbs')
    //User
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define paths of directory for express config 
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        userName: 'Mahadee'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        userImg: '/img/dp1.jpg',
        userName: 'Mahadee'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!!!',
        userName: 'Mahadee',
        message: 'Lorem ispum dolor sit amet'
    })
})

app.get('/weather', (req, res) => {
    const { address } = req.query
    if (!address) {
        return res.send({
            error: 'No address was provided, please enter an address!'
        })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, { localTime, forecastData, observationTime } = {}) => {
            if (error) {
                return res.send({ error })
            } else {
                return res.send({
                    location,
                    localTime,
                    forecast: forecastData,
                    observationTime
                })
            }
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        message: 'Requested help page does not exist!!!',
        userName: 'Mahadee'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        message: 'Requested page does not exist!!!',
        userName: 'Mahadee'
    })
})

app.listen(port, () => {
    console.log('Server running on port ' + port)
})