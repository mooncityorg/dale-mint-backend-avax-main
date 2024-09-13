const express = require("express");
const bodyparser = require('body-parser');
const cors = require('cors');
// const bodyparser = require('body-parser');
const { addUser, init, getAllInfo } = require('./db');

// Initialize Express
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


// Create GET request
app.get("/", (req, res) => {
    res.send(JSON.stringify({
        statusCode: 404,
        message: "Cannot GET /",
        error: "Not Found"
    }));
});

app.get("/mints", async (req, res) => {
    await init();
    let result = await getAllInfo();
    res.send(JSON.stringify(result ? result : "Oops! Something went wrong"));
})

app.post('/user', async (req, res) => {
    try {
        let discordId = req.body.id;
        let walletAddress = req.body.address;
        let mintedNum = Number(req.body.num);
        await init();
        let result = await addUser(discordId, walletAddress, mintedNum);
        res.send(JSON.stringify(result ? result : -200));
    } catch (e) {
        console.log(e, ">> error occured from receiving deposit request");
        res.send(JSON.stringify(-1));
        return;
    }
})

// Initialize server
app.listen(5000, () => {
    console.log("Running on port 5000.");
});

module.exports = app;
