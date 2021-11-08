// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const PORT = process.env.port || 5000;
/* to listen to what ever in  the enviroment vairable PORT 
or 3000 if there is nothing to listen to , to avoid 
just listening to PORt 5000 which is might be just for me at times */

app.listen(PORT,()=>{
    console.log(`the app is running on port number ${PORT}`);
})
/*  GET route1:serverSide>> setup on the server side
 with the first argument as a string naming the route,
  and the second argument a callback function to return the JS object
  projectData */
app.get('/myData',(req,res)=>{
    res.send(projectData);
})
/*  an entry to the project endpoint
 using a POST route setup on the server side
  to post data to server */
  
app.post('/saveMyData',(req,res)=>{
    const Scountry =req.body.country;
    projectData.country = Scountry;
    const Scity =req.body.name;
    projectData.name= Scity;
    const Stemp = req.body.temp;
    projectData.temp = Stemp;
    const Sdate = req.body.date;
    projectData.date = Sdate;
    const Sfeelings = req.body.feelings;
    projectData.feelings = Sfeelings;
    res.end();
})