const mongoose = require('mongoose');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers');
const campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error :"));
db.once("open", () =>{
    console.log("Database Connected")
});

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async () => {
    await campground.deleteMany({});
    for(let i = 0 ; i < 50 ; i ++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new campground({
            location :`${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image:"https://source.unsplash.com/random/?city,night",
            description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt cum perferendis quia, explicabo quasi dolorem. Dolorum dolor, inventore mollitia rerum neque veritatis consectetur. Corporis quod, ipsa eius asperiores dolor veritatis?!",
            price
        })
        await camp.save();
        console.log(camp);
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});