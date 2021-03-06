const mongoose = require('mongoose');
const Campground = require("../models/campground")
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers")
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];



const seedDb = async () => {
    await Campground.deleteMany({});

    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "61098f141374da5580f2f8d9",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae eos neque ipsa, cumque doloribus fugiat velit. Quasi excepturi sint quisquam dicta commodi, accusantium, laudantium omnis velit, eius officiis qui aut.",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude

                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600103881/YelpCamp/lz8jjv2gyynjil7lswf4.png',
                    filename: 'YelpCamp/yglavi1pkcuyuwqcgq2s'
                },
                {
                    url: 'https://res.cloudinary.com/dflrsydng/image/upload/v1628385101/YelpCamp/insi8xxclbhrmkgq0kqu.jpg',
                    filename: 'YelpCamp/insi8xxclbhrmkgq0kqu'
                }
            ],
        });
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
})