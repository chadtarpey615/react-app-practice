const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");

const PORT = 3002;
const routes = require("./routes");


app.engine("ejs", ejsMate)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", routes)
app.listen(3002, () => {
    console.log(`The server is running on port: ${PORT}`)
})