const conn = require('./connection');


function getOptions(data, cb){		
	conn.query(getMovie('pelicula.id, pelicula.poster, pelicula.titulo', data), function(err,res){
		if (err){
	      return cb({ error: true, message: "no se encontraron opciones." })
	    }
	        
	    cb(null, res)
	})		    
}


function getCount(data, cb){		
	conn.query(getMovie('COUNT(pelicula.titulo) AS total', data),function(err,res){
		if (err){
	      return cb({ error: true, message: "Problemas en el servidor." })
	    }
	    cb(null,{total: res[0].total});
	})
}


function getMovie(columns, data){
	return `SELECT ${columns}
			FROM pelicula 
			JOIN director_pelicula 
			ON pelicula.id = director_pelicula.pelicula_id 
			JOIN actor_pelicula 
			ON pelicula.id = actor_pelicula.actor_id 
			WHERE ${campoExist('director_pelicula.director_id', data.director)} 
			AND ${campoExist('pelicula.genero_id',data.genero)} 
			AND ${campoExist('actor_pelicula.actor_id', data.actor)}`;
}


/*
* Verificamos si los campos de genero, director, actor son validos para hacerlos parte de la busqueda
* Si no los tiene, retornamos un 1 
*/
//filterRecords
function campoExist(campo, valor){
	if(valor == undefined || valor == null || valor == 0){
		return 1;
	}else{
		return `${campo} = ${valor}`
	}
}

exports.getOptions = getOptions;
exports.getCount = getCount;