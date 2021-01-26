const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptions, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i< 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const randomPrice = Math.floor(Math.random() * 30) + 5;
        const camp = new Campground ({
            author: '6008d0f27ebaf141fcee5a45',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images:  [
                {
                    url: "https://res.cloudinary.com/holymoses/image/upload/v1611284378/YelpCamp/hwzotzvjir42zopu4rzt.jpg",
                    filename: "YelpCamp/hwzotzvjir42zopu4rzt"
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum consequatur perspiciatis excepturi, culpa, quas libero minima, itaque incidunt odio cum molestiae architecto! Deserunt nemo, autem consectetur perspiciatis in odio repellendus!',
            price: randomPrice
        });
        await camp.save();
    }
}

seedDb().then (() => {
    mongoose.connection.close();
});