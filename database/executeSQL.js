// Vi importerer tedious og gør klar til "Connection" og "Request"
var Connection = require("tedious").Connection;
var Request = require("tedious").Request;

// Henter vores sql konfiguration ind
const config = require("./config.json");

// Laver executeSQL funktion, som tager en sql-query som parameter
function executeSQL(query) {
  return new Promise((resolve, reject) => {
    var connection = new Connection(config);

    connection.on("connect", function (err) {
      if (err) {
        console.log(err);
      } else {
        request = new Request(query, function (err) {
          if (err) {
            console.log(err);
            reject(err);
          }
        });

        connection.execSql(request);

        var counter = 1;
        response = {};

        request.on("row", function (columns) {
          response[counter] = {};
          columns.forEach(function (column) {
            response[counter][column.metadata.colName] = column.value;
          });
          counter += 1;
        });
        request.on("requestCompleted", () => {
          resolve(response);
        });
      }
    });
    connection.connect();
  });
}

module.exports = { executeSQL };
