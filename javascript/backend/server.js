const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const bookRoutes = require("./routes/bookRoutes")
const PORT = 5000
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
            console.log(`Server is firing up on that port ${PORT} ya mean`)
        })
    })
    .catch((err) => {
        console.log(err);
    });




