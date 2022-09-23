const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const path = require("path");

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    await Campground.deleteMany({});

    for (let i = 0; i < 500; i++) {
        const rand = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);

        const c = new Campground({
            author: '632b299f20829d3c2bbb4ffe',
            location: `${cities[rand].city}, ${cities[rand].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[rand].longitude,
                    cities[rand].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/da1g34v2f/image/upload/v1663867718/YelpCamp/ydfuumejeboij8on8p3z.jpg',
                    filename: 'YelpCamp/l9gdikzzdmerkmivqyhp'
                }
            ],
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam blanditiis dolores eaque et expedita hic ipsa iure, laudantium mollitia neque nesciunt quam quasi reprehenderit temporibus ut veritatis vero vitae voluptatum.',
            price: price
        });

        await c.save();
    }
}

seedDB().then(() => mongoose.connection.close());