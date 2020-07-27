var listDatabases = require('./db')
const bodyParser = require('body-parser')
var app = require('express')();
var http = require('http').createServer(app);
var MongoClient = require('mongodb');


var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

async function main(){
    const uri = "mongodb://localhost:27017";
    try{
        const client = await MongoClient.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true , socketTimeoutMS: 0} );
        console.log("connection success")
        return client

    }
    catch(e){
        console.log(e)
    }
    

}

async function  getUserById(userId){
    const {id} = userId;
    const uri = "mongodb://localhost:27017";
    const client = await MongoClient.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true , socketTimeoutMS: 0} );
    result = await client.db('restapi').collection('user').findOne({_id: id})

    if(result){
        console.log(`Found a listing in the collection with the id '${id}':`);
        console.log(result);
    }else{
        console.log(`No listings found with the id '${id}'`);
    }
    
}

async function createUser(newListing){
    const uri = "mongodb://localhost:27017";
    const client = await MongoClient.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true , socketTimeoutMS: 0} );
    const result = await client.db("restapi").collection("user").insertOne(newListing);
    console.log(`New user created with the following id: ${result.insertedId}`);
}




app.get('/', (req, res)=>{
    const dbConnection = main();
    return dbConnection

});

app.get('/user/get/:id', (req, res)=>{
    const userId = req.params
    const fetchOne = getUserById(userId)
    return fetchOne
});

app.post('/user/create',jsonParser, (req, res)=>{
    const data = req.body
    createUser(data);
    
    
});



http.listen(3000, ()=>{
    console.log('Listening on *:3000');
});