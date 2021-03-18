require('dotenv').config()
var Twitter = require('twitter');
var { execSync } = require("child_process");
const fs = require("fs")

var client = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
});

// var read = execSync('python', ["./generateMapPerlin.py"]);
var read = execSync('python ./generateMapPerlin.py');

const imageData = fs.readFileSync("./generatedMap.png") //replace with the path to your image

client.post("media/upload", { media: imageData }, function (error, media, response) {
    if (error) {
        console.log(error)
    } else {
        const status = {
            // status: "I tweeted from Node.js!",
            media_ids: media.media_id_string
        }

        client.post("statuses/update", status, function (error, tweet, response) {
            if (error) {
                console.log(error)
            } else {
                console.log("Successfully tweeted an image!")
            }
        })
    }
})
