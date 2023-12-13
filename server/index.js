const express = require("express")
const path = require("path")
const mongoose = require("mongoose");


const app = express()
const port = 5050;
const config = require("./config/key.js")


app.use(express.static(path.join(__dirname, "../client/build/")));
app.use("/image", express.static("./image"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// express.router 사용(페이지별 만들어 놓음)
app.use("/api/post", require("./router/post.js"));
app.use("/api/user", require("./router/user.js"));

app.listen(port, () => {
    mongoose.connect(config.mongoURI)
        .then(() => {
            console.log("running --->" + port);
            console.log("mongoose --> connecting");
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
