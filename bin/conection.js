var mysql = require('mysql');

var conexion = mysql.createConnection({
    host : '',
    database : '',
    user : '',
    password : '',
  });
  
  conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + conexion.threadId);
  });

   const makeQuery = function(sql) {
    return new Promise(resolve => {
      conexion.query(sql, function(error, results, fields) {
        if (error) throw error;
  
        resolve(results);
      });
    });
   };

  module.exports = {
    'conexion': conexion,
    'makeQuery': makeQuery
  };