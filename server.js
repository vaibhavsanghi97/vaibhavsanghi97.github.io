const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const {MongoClient} = require('mongodb');

// used mongo atlas cloud db
const uri = "mongodb+srv://vaibhavsanghi:Grey%40123@cluster0.xzgjo.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Connect to MongoDB and then perform get and post requests while connected
client.connect(err => {
    const collection = client.db("test").collection("users");
    if (err) 
        return console.error(err)
    
    console.log("Connected to db")

    // get the page and data to display
    app.get('/', (req, res) => {

        // convert data from mongo to array and then pass array to ejs to render
        collection.find().toArray().then(results => {
            res.render('index.ejs', {users: results})
        }).catch(error => console.error(error))
    })

    // post data to Mongo
    app.post('/signup', (req, res) => {

        // insert data from form in ejs to mongodb and then redirect to main page
        collection.insertOne(req.body).then(result => {
            res.redirect('/')
        }).catch(error => console.error(error))
    })
});

// body parser middleware
app.use(bodyParser.urlencoded({extended: true}))

// basic frontend utility that uses js, embedded js
app.set('view engine', 'ejs')

//hosted on localhost:3000
app.listen(3000, () => {
    console.log('listening on 3000')
})
