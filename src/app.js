const path = require('path');
const hbs = require('hbs')

const geocode = require("../utilis/geocode")
const forecast = require("../utilis/forecast")

const express = require('express');
const app = express();


// define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../Templates/views")
const partialsPath = path.join(__dirname, "../Templates/partials")
//setup handlebars engine and views locations

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup  static directory to use
app.use(express.static(publicDirectoryPath))

//rendering dynamic content
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Lionel kandekwe',
    })
})
// about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Lionel kandekwe'
    })
})

// help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Lionel kandekwe'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Lionel Kandekwe',
        errorMessage: 'Help article not found'
    })
})
// weather


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address',
        })
    } else {
        return geocode(req.query.address, (error, {
            longitude,
            latitude,
            location,
        } = {}) => {
            if (error) {
                return res.send({
                    error
                });
            }
            forecast(longitude, latitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error
                    })
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address,
                })
                /*
                console.log(location);
                console.log(forecastData)
                */
            })
        })
    }

})

// products
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })

    }




    console.log(req.query)
    res.send({
        products: [],
    })

})
// anything that hasn't been matched
app.get('*', (req, res) => {
    res.render("404", {
        title: '404',
        name: 'Lionel',
        errorMessage: 'Page Not found'
    })
})

const url = 4000
app.listen(url, (req, res) => {
    console.log('server has started')
})