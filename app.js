const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const imdb = require('./src/imdb');
const DENZEL_IMDB_ID = 'nm0000243';

const CONNECTION_URL = "mongodb+srv://cindy_mc:mongoAtlas1606@cluster0-10rpr.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "denzel-db";



var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.listen(9292, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("movies");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});


app.get("/movies/populate", async(request, response) => {
    const denzel_movies = await imdb(DENZEL_IMDB_ID);
    collection.insert(denzel_movies, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        let resp = {
          total : result.insertedCount
        };

        response.json(resp);
    });
});

app.get("/movies", (request, response) => {
    collection.find({metascore:{$gte:70}}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        var random = Math.floor(Math.random() * Math.floor(result.length));
        result = result[random];
        response.send(result);
    });
});

app.get("/movies/search", (request, response) => {
  var metascore = +request.query.metascore;
  var limit = +request.query.limit;
  collection.find({metascore:{$gte:metascore}})
  .limit(limit)
  .sort({metascore:-1})
  .toArray((error, result) => {
      if(error) {
          return response.status(500).send(error);
      }

      let resp = {
        limit : limit,
        results : result,
        total : result.length
      }

      response.send(resp);
  });
});

app.get("/movies/:id", (request, response) => {
    collection.findOne({ "id": request.params.id }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.post("/movies/:id", (request, response) => {
      collection.updateOne({ "id": request.params.id },{$set : {"date": request.body.date , "review": request.body.review}}, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }

        let resp = {
          _id : result._id
        }

        response.send(resp);
    });
})








//node app.js pour lancer

//--