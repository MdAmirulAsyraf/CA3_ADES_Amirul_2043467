//---------------------------------------------------------
// Name: Muhamad Amirul Asyraf Bin Abdul Razak
// Class: DIT_FT_1B22
// Student Number : P2043467
// 
// File Type: App.js 
//---------------------------------------------------------

console.log ("----------------------------------------------")
console.log ("              ADES_CA3 (app.js)               ")
console.log ("----------------------------------------------")


//---------------------------------------
//                Imports                
//---------------------------------------
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var pCmdr = require('../model/pCmdr.js')


const axios = require("axios");
//const bodyParser = require("body-parser");


//---------------------------------------
//        MiddleWare Functions              
//---------------------------------------

//Prints Useful Debugging information
var printDebugInfo = function (req, res, next){
    console.log();
    console.log("----------------( Debug Info )------------------");
    
    console.log("Servicing " + req.url + "...");

    console.log("> req.params: " + JSON.stringify(req.params));
    console.log("> req.body: " + JSON.stringify(req.body));

    console.log("------------- ( Debug Info Ends )---------------");
    console.log();

    next();
}

var urlencodedParser = bodyParser.urlencoded({extended:true});
var jsonParser = bodyParser.json();

//---------------------------------------
//        MiddleWare Config             
//---------------------------------------
app.use(bodyParser.json());
//app.use(express.json());
app.use(urlencodedParser);

//---------------------------------------
//              Endpoints        
//---------------------------------------


//Gets Men Status
app.get('/get', printDebugInfo,function(req,res){
    
    pCmdr.findAll( function(err,result){
        if (!err) {
            res.send(result);
        if(result == null) {
                res.status(404).send("No Men's Records Found");
            }
        } 
        else {
            res.status(500).send("Internal Server Error");
        } 
    })
});

//Posts Men Status
app.post('/post', printDebugInfo, function (req, res) {
    var data = {recordLog: req.body.recordLog};
    pCmdr.insert(data, function 
        (err, result) {
        if (!err) {
             res.status(201).send("Unit Record is uploaded");
        } 
        else {
            res.status(500).send("Internal Server Error");
        }
    });
});

//Deletes Men StatusLogs
app.delete('/delete', printDebugInfo, function (req, res) {

    pCmdr.delete(function(err, result){
        if (!err) {
            console.log(result);
            res.status(200).send("Delete successful data cleared");
        }else{
            var output = {"Result": "Data delete UNSUCCESSFUL. Please Contact Company OC"};
            res.status(404).send(output);
        }
    })

})


module.exports = app;