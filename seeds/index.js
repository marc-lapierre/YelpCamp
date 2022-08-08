const mongoose = require('mongoose')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected')
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for(let i = 0; i < 15; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '62eb1c6082b2d8f6cc2d2b9c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                    {
                      url: 'https://res.cloudinary.com/dl2yf6cwu/image/upload/v1659918674/YelpCamp/s2x2cexefp0ccgug5jtg.jpg',
                      filename: 'YelpCamp/s2x2cexefp0ccgug5jtg'
                    },
                    {
                      url: 'https://res.cloudinary.com/dl2yf6cwu/image/upload/v1659918674/YelpCamp/f9g5fflgpswkr7k1s7i5.jpg',
                      filename: 'YelpCamp/f9g5fflgpswkr7k1s7i5'
                    },
                    {
                      url: 'https://res.cloudinary.com/dl2yf6cwu/image/upload/v1659918674/YelpCamp/xon0o8ioxlq1rwgdj8fl.jpg',
                      filename: 'YelpCamp/xon0o8ioxlq1rwgdj8fl'
                    }
                  ],
            description: 'Ad minus consequatur At exercitationem consequatur et maxime dolor qui quia minima ut dolorem debitis eos earum placeat. Non velit asperiores ut expedita facilis eum quaerat sunt est dicta dicta sit deleniti accusamus vel eius explicabo?',
            price
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})
