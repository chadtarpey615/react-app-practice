if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-Override");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user")


// require our routes 
const userRoutes = require("./routes/users")
const campgroundsRoutes = require("./routes/campgrounds")
const reviewsRoutes = require("./routes/reviews")


// connecting mongo database with base localhost
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();



// set view engine to ejs, but could  handlebars etc...
app.engine("ejs", ejsMate)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// express middleware
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));


// express-session configs
const sessionConfig = {
    secret: "thisshouldbeabettersecret!",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // formula to get the date out of milliseconds 1000ms 60seconds 60 mins 24 hours 7 days
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})



// using routes with prefix 
app.use("/", userRoutes)
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/reviews", reviewsRoutes);


app.get('/', (req, res) => {
    res.render("home")
})




app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh No, Something went wrong"
    res.status(statusCode).render("error", { err })

})


// starting our port 
app.listen(3001, () => {
    console.log("Server listening on port 3001");
});





