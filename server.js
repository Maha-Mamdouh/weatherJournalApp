// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express=require('express');
// Start up an instance of app
const app=express();
/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port =3000;
const server=app.listen(port,()=>{console.log(`Server running at url: http://localhost:${port}`)})
// Callback to debug

// Initialize all route with a callback function
// Callback function to complete GET '/all'
app.get('/all',function(req,res){
    //res.send(data);
    res.send(projectData);
    //console.log(req);
});
// Post Route
app.post('/sendData', function(req,res){
    projectData={
        name: req.body.name,
        temp: req.body.temp,
        feel: req.body.feel,
        date: req.body.date
    }
});

