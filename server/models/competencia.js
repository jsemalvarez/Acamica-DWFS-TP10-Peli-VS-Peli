const conn = require('./connection');

function getAll(cb){
	var sql = "SELECT * FROM competencias";
	conn.query(sql,function(err,res){
		if (err || !res.length){
	      return cb({ error: true, message: "no se encontraron competencias." })
	    } 
	    cb(null, res)
	})
}


function getCompetencia(competenciaId, cb){
	conn.query(getAllDates(), [competenciaId], function(err,res){
		if (err || !res.length){
	      return cb({ error: true, message: "no se encontraron competencias." })
	    }
	    var data = {
			nombre: res[0].competencia,
			genero_nombre: res[0].genero,
			actor_nombre: res[0].director,
			director_nombre: res[0].actor
		} 		
	    cb(null, data)
	})
}


function getAllDates(){
	return `SELECT competencias.nombre AS competencia, genero.nombre AS genero, director.nombre AS director, actor.nombre AS actor 
	 FROM competencias 
	 LEFT JOIN genero 
	 ON competencias.genero_id= genero.id 
	 LEFT JOIN director 
	 ON competencias.director_id=director.id 
	 LEFT JOIN actor 
	 ON competencias.actor_id=actor.id 
	 WHERE competencias.id = ?`
}


function setCompetencia(data, cb){			
	var sql = `INSERT INTO competencias (nombre, genero_id, director_id, actor_id) VALUES (?,?,?,?)`;
	conn.query(sql,[data.nombre,criterio(data.genero),criterio(data.director),criterio(data.actor)],function(err,res){
		// Error number: 1062; Symbol: ER_DUP_ENTRY; SQLSTATE: 23000		
		if (err && err.code === 'ER_DUP_ENTRY'){
	      	return cb({ error: true, message: "Ese nombre ya existe" })
	    }	        
	    if (err){
	      	return cb({ error: true, message: "Problemas con el servidor."});
	    } 
	    cb()
	})	
}


/*
* Verificamos si la competenia tiene criterios de genero, director, actor validos para guardarlos
* Si no los tiene, guardamos un 0 
*/
function criterio(valor){
	if(valor == undefined || valor == null){
		return 0;
	}else{
		return valor;
	}
}


function editarNombre(competencia, nuevoNombre, cb){	
	var sql = `UPDATE competencias set nombre = ? WHERE Id = ?`;
	conn.query(sql,[nuevoNombre,competencia],function(err,res){
		if (err && err.code === 'ER_DUP_ENTRY'){
	      	return cb({ error: true, message: "Ese nombre ya existe" })
	    }			
		if (err){
	      return cb({ error: true, message: "Problemas con el servidor." })
	    } 
	    cb()
	})
}


function eliminar(competencia, cb){
	var sql = `DELETE FROM competencias WHERE Id = ?`;
	conn.query(sql,[competencia],function(err,res){		
		if (err){
	      return cb({ error: true, message: "Problemas con el servidor." })
	    } 
	    cb()
	})
}


exports.getAll = getAll;
exports.getCompetencia = getCompetencia;
exports.setCompetencia = setCompetencia;
exports.eliminar = eliminar;
exports.editarNombre = editarNombre;