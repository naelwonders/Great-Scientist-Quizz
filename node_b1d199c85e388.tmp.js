//bien télécharger express en local pour si je veux bosser dessus dans le futur

const express = require('express');
const MongoClient =  require('mongodb').MongoClient; //on a pas besoin de toute la librairie mongodb, que l'application mongo client
let filestream = require('fs'); //lire un fichier

const app = express();

console.log(__dirname);
app.use("/", express.static (__dirname + "/wwwroot")); //

app.listen(8000);

app.get("/questions", function(request, response){
    const url = 'mongodb://127.0.0.1:27017/';
    const mongoClient = new MongoClient(url); // nouvelle connection sur le mongo client
    async function connectDB() {
        try 
        { 
            await mongoClient.connect();
            console.log("You successfully connected to DB"); 
            const quizDatabase = mongoClient.db("Quiz");
            const questionsCollection = quizDatabase.collection("questions");
            const questionsArray = await questionsCollection.find().toArray();
        }
        catch (error) 
        { 
            console.error(error); }
        }
connectDB();
    let resultJSON = {}; //je pourrais aussi copier coller mon JSON dedans mais ici on va utiliser MOMGODB
    response.setHeader("Content-type", "application/json");
    response.send(JSON.stringify(resultJSON));
});

