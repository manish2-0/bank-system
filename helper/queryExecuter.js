const { connection } = require("../config/database.js");

function queryExecuter(query,values=[]) {
    return new Promise((resolve, reject) => {
        connection.query(query,values, (err, rows, fields) => {
            const response = {status: false};
            if (err) {
                response.error = "An error occurred. If this error persists, please send a mail to admin";
                response.actualError = err.message;                
            }else{
                if (rows.length>0) //for update / insert query
                    response.data = rows.map((row, index) => {
                        return Object.assign({}, row);
                    });
                response.status = true;
            }
            resolve(response);
        })
    })
}

module.exports = queryExecuter;