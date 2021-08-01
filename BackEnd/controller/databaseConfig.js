
//---------------------------------------
//                Imports                
//---------------------------------------
var mysql= require('mysql');

//---------------------------------------
//             Configuration               
//---------------------------------------

var dbConnect = {

    getConnection:function(){
        var conn = mysql.createConnection({
            host:"remotemysql.com",
            user:"5uHEmxtpRP",
            password:"XXlcDW69qb", // personal instance password
            database:"5uHEmxtpRP"     
        }

        );
        
        return conn;
    }
}

//---------------------------------------
//                Exports                
//---------------------------------------

module.exports = dbConnect;