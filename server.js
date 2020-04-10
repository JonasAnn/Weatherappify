const express = require('express');

// Start up an instance of app
const app = express();

//configure express to use mildware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//server setup
const port = 3000;
const server = app.listen(port, listening);

// Callback to debug
function listening(){
    console.log(`running on ${port}`);
};


// Setup empty JS object to act as endpoint for all routes
const projectData = [];


//get response to fetch api request
app.get('', getData);

function getData(req,res){
    res.send(projectData);
    console.log(projectData);
};
//post response to post request
app.post('/add', addData);

function addData(req,res){
    newEntry = {
        temperature:req.body.temperature, 
        date:req.body.date,
        response:req.body.response
    }
    projectData.unshift(newEntry);
    console.log(projectData);
}

//get response to ui update
app.get('/all', getAllData);

function getAllData(req,res){
    res.send(ProjectData);
    console.log(ProjectData);
}