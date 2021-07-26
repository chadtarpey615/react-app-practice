const express = require('express');
const app = express();


app.listen('/', (req, res) => {
    res.send("Hello From Yelp Camp")
})
app.listen(3001, () => {
    console.log("Server listening on port 3001");
})

