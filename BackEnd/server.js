//---------------------------------------------------------
// Name: Muhamad Amirul Asyraf Bin Abdul Razak
// Class: DIT_FT_2B22
// Student Number : P2043467
// 
// File Type: server.js
//---------------------------------------------------------

console.log ("----------------------------------------------")
console.log ("                 (server.js)                  ")
console.log ("----------------------------------------------")

//-------------------------------------
// imports
//-------------------------------------
//const app = require('./controller/app');
// ok, that was weird.
const app = require('./controller/app');


//-------------------------------------  
// configurations
//-------------------------------------
const hostname = "localhost";
const port = 3000; 


//-------------------------------------
// main
//-------------------------------------
// start the server and start listening for incoming requests
app.listen(port, hostname, () => {
    console.log(`Server started and accessible via http://${hostname}:${port}/`);
});



