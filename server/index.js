const express = require("express")
const path = require("path")
const mongoose = require("mongoose");

const app = express()
const port = 5050;

app.use(express.static(path.join(__dirname, "../client/build/")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
    mongoose
        .connect(
            "mongodb+srv://leejiyoung492:rhqnr1159*@cluster0.p8x27w7.mongodb.net/?retryWrites=true&w=majority"
        )
        .then(() => {
            console.log("running --->" + port);
            console.log("connecting ---> + mongDB..");
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
})
