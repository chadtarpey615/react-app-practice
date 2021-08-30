const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRoute = require('./routes/user');
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', userRoute);

const port = process.env.PORT || 8080;

mongoose.connect(process.env.DB_HOST, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(port, () => console.log(`Server and database running on ${port}, http://localhost:${port}`));
    })
    .catch((err) => {
        console.log(err);
    });
