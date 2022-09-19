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

    for (let i = 0; i < 50; i++) {
        const rand = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);

        const c = new Campground({
            location: `${cities[rand].city}, ${cities[rand].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://media.gettyimages.com/photos/young-woman-watches-sunrise-outside-camping-tent-picture-id1248575497?s=2048x2048',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam blanditiis dolores eaque et expedita hic ipsa iure, laudantium mollitia neque nesciunt quam quasi reprehenderit temporibus ut veritatis vero vitae voluptatum.',
            price: price
        });

        await c.save();
    }
}

seedDB().then(() => mongoose.connection.close());