
// .env file
require("dotenv").config();
// Require
var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');
var fs = require("fs");
// Spotify
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// OMDB
if (process.argv[2] === "movie-this") {

    var movieName = process.argv.slice(3).join(" ");

    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
        function(response) {
        //   console.log(response);
          console.log("The movie's Title is: " + response.data.Title);
          console.log("The movie's Release Year is: " + response.data.Year);
          console.log("The movie's Imdb Rating is: " + response.data.imdbRating);
          console.log("The movie's Rotten Tomato rating is: " + response.data.imdbVotes);
          console.log("The movie's Country is: " + response.data.Country);
          console.log("The movie's Language is: " + response.data.Language);
          console.log("The movie's Plot is: " + response.data.Plot);
          console.log("The movie's Actors are: " + response.data.Actors);
        }
    );
}


// Bands In Town
if (process.argv[2] === "concert-this") {

    let artist = process.argv.slice(3).join("+"); 
    let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(function(response) {
        //   console.log(response.data[0].venue);
        for (let i = 0; i < response.data.length; i++) {

            console.log(`
            Venue Name:  ${response.data[i].venue.name}`);
            fs.appendFileSync('log.txt', `
            Venue Name: ${response.data[i].venue.name}`, 'utf8');

            console.log(`
            Venue Location: ${response.data[i].venue.city}, ${response.data[i].venue.country}`);
            fs.appendFileSync('log.txt', `
            Venue Location: ${response.data[i].venue.city},${response.data[i].venue.country}`, 'utf8');
            
            let concertDate = moment(response.data[i].datetime).format("MM-DD-YYYY");
            console.log(`
            Concert Date: ${concertDate}
            `);
            fs.appendFileSync('log.txt', `
            Concert Date: ${concertDate}
            `, 'utf8');
        }
    });
}


// Spotify 

if (process.argv[2] === "spotify-this-song") {

    let songName = process.argv.slice(3).join("+");
    // console.log(songName);

    if(process.argv[2] === "spotify-this-song"){
        spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
            if (err) {
            fs.appendFileSync('log.txt', `Error occurred: ${err}`, 'utf8');
            return console.log(`Error occurred: ${err}`);
            }
        
            for (let i = 0; i < data.tracks.items.length; i++) {
                console.log(`
                Song Title: ${data.tracks.items[i].name}`);
                fs.appendFileSync('log.txt', `
                Song Title: ${data.tracks.items[i].name}`, 'utf8'); 
                
                console.log(`
                Album Title: ${data.tracks.items[i].album.name}`);
                fs.appendFileSync('log.txt', `
                Album Title: ${data.tracks.items[i].album.name}`, 'utf8');
                
                console.log(`
                Artist(s) Name: ${data.tracks.items[i].artists[0].name}`);
                fs.appendFileSync('log.txt', `
                Artist(s) Name: ${data.tracks.items[i].artists[0].name}`, 'utf8');
                
                console.log(`
                Preview URL: ${data.tracks.items[i].preview_url}`);
                fs.appendFileSync('log.txt', `
                Preview URL: ${data.tracks.items[i].preview_url}
                /n`, 'utf8');
            }
            });
    } else { //The Sign by Ace of Base
        spotify.search({ type: 'track', query: 'The Sign', limit: 1 }, function(err, data) {
            if (err) {
                fs.appendFileSync('log.txt', `
                Error occurred: ${err}`, 'utf8');
                return console.log(`
                Error occurred: ${err}`);
            }
        
            console.log(`You did not enter a song title. Here is a recommendation:`);
        
            for (let i = 0; i < data.tracks.items.length; i++) {
                if (data.tracks.items[i].artists[0].name === "Ace of Base") {
                    console.log(`
                    Song Title: ${data.tracks.items[i].name}`);
                    fs.appendFileSync('log.txt', `
                    Song Title: ${data.tracks.items[i].name}`, 'utf8'); 
                    
                    console.log(`
                    Album Title: ${data.tracks.items[i].album.name}`);
                    fs.appendFileSync('log.txt', `
                    Album Title: ${data.tracks.items[i].album.name}`, 'utf8');
                    
                    console.log(`
                    Artist(s) Name: ${data.tracks.items[i].artists[0].name}`);
                    fs.appendFileSync('log.txt', `
                    Artist(s) Name: ${data.tracks.items[i].artists[0].name}`, 'utf8');
                    
                    console.log(`
                    Preview URL: ${data.tracks.items[i].preview_url}`);
                    fs.appendFileSync('log.txt', `
                    Preview URL: ${data.tracks.items[i].preview_url}
                    `, 'utf8');
                }
            }
        });
    }

}


// Do What It Says

