const conn = require('./connection');


function setVoto(competenciaId, peliculaId, cb){
	var sql = `INSERT INTO votos (competenciaId, peliculaId) VALUES (?,?)`;
	conn.query(sql,[competenciaId,peliculaId],function(err,res){
		if (err){
	      return cb({ error: true, message: "Problemas con el servidor." })
	    } 
	    cb()
	})
}


function getTop3(competenciaId, cb){
	var sql = `SELECT pelicula.id, pelicula.poster, pelicula.titulo, votos.peliculaId, 
				COUNT(votos.peliculaId) as votos, votos.competenciaId 
				FROM pelicula 
				JOIN votos ON pelicula.id = votos.peliculaId 
				GROUP BY votos.peliculaId 
				HAVING votos.competenciaId = ? 
				ORDER BY votos DESC LIMIT 3`;
	conn.query(sql,[competenciaId],function(err,res){
		if (err){
	      return cb({ error: true, message: "Problemas con el servidor." })
	    }

	    var sqlCompetencia = `SELECT nombre FROM competencias WHERE id = ${competenciaId}`;
	    conn.query(sqlCompetencia,function(err, result){
	    	if (err){
		      return cb({ error: true, message: "Problemas con el servidor." })
		    }

		    var data = {
				competencia: result[0].nombre,
				resultados: res
			}
			cb(null, data)
	    })	    
	})
}


function reiniciar(competenciaId, cb){
	var sql = `DELETE FROM votos WHERE competenciaId = ?`;
	conn.query(sql,[competenciaId],function(err,res){		
		if (err){
	      return cb({ error: true, message: "Problemas con el servidor." })
	    } 
	    cb()
	})
}

exports.setVoto = setVoto;
exports.getTop3 = getTop3;
exports.reiniciar = reiniciar;

