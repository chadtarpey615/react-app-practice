const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = 5000;
const bookRoutes = require("./routes/bookRoutes")
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use("/api", bookRoutes)


mongoose.connect(process.env.DB_HOST, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(err);
    });
