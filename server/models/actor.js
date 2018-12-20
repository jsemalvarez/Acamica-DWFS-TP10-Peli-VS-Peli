const conn = require('./connection');

function getAll(cb){
	var sql = "SELECT * FROM actor";
	conn.query(sql,function(err,res){
		if (err || !res.length){
	      return cb({ error: true, message: "no se encontraron generos." })
	    } 
	    cb(null, res)
	})
}


exports.getAll = getAll;