//---------------------------------------
//                Imports                
//---------------------------------------
var db = require('../controller/databaseConfig.js');

//---------------------------------------
//        Objects and Functions              
//---------------------------------------

var pCmdr = {

    findAll: function (callback) {
        var conn = db.getConnection();
    
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
    
                var sql = `
                SELECT 
                    * 
                 FROM 
                    5uHEmxtpRP.unitActivityRecords;
                `;
    
                conn.query(sql, [], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },



    insert: function (unitActivityRecords, callback) {
        
        var recordLog = unitActivityRecords.recordLog;
    
        var conn = db.getConnection();
    
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
    
                var sql = `
                INSERT INTO
                    unitActivityRecords
                (recordLog)
                VALUES
                    (?);
                
                `;
    
                conn.query(sql, [recordLog], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },

    delete: function (callback) {
        var conn = db.getConnection();
    
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
    
                var sql = `
                DELETE FROM
                    5uHEmxtpRP.unitActivityRecords;
                `;
    
                conn.query(sql, [], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    }


};


//---------------------------------------
//                Exports                
//---------------------------------------

module.exports = pCmdr;