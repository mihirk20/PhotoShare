const express = require('express');

const mongoose = require('mongoose');

const cors=require("cors");

const app = express();

const MyError = require("./model/error");

const user_router = require('./Routes/users_route')

const location_router = require("./Routes/location_route")

app.use(cors());

app.use(express.json());

app.use("/uploads/users",express.static(`${__dirname}\\uploads\\users`))

app.use("/api/locations", location_router);

app.use("/api/users", user_router);

app.use("*", (req, res, next) => {
    return next(new MyError("Cannot find path", 404))
})

app.use((error, req, res, next) => {
    if (res.headerSent) {
        next(error);
    }
    res.status(error.code || 500);
    res.json({
        result: "fail",
        message: error.message || "Something bad happened"
    });
});

mongoose.connect('mongodb+srv://admin:L0cuAc3zNxD91c18@cluster0.djfml2m.mongodb.net/photoshare?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000, () => {
            console.log("Server at 5000");
        });
    }).catch((error)=>{
        console.log(`Can't connect to database ${error}`);
    })



// 1pO69PLXf9Lpp7Dg
// mongodb+srv://admin:L0cuAc3zNxD91c18@cluster0.djfml2m.mongodb.net/photoshare?retryWrites=true&w=majority