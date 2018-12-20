const Competencia = require('./../models/competencia');
const Pelicula = require('./../models/pelicula');

function getAll(req,res){
	Competencia.getAll(function(err,result){
		if(err){
			console.log("error:" + err.message)
			return res.status(500).send(err.messag);
		}

		if(result.length == 0){
			return res.status(400).send("No existen las competencias");
		}	

		return res.status(200).send(JSON.stringify(result));
	})
}


function getCompetencia(req,res){
	const competenciaId = req.params.id;
	Competencia.getCompetencia(competenciaId, function(err,result){
		if(err){
			console.log("error:" + err.message)
			return res.status(500).send(err.messag);
		}

		if(result.length == 0){
			return res.status(400).send("No existe la competencia");
		}	

		return res.status(200).send(JSON.stringify(result));
	})
}


/*
* Para crear una competencia, primero tenemos que comproblar que existen al menos dos peliculas
* con los criterios señalados por los usuarios.
*/
function setCompetencia(req, res){	
	const data = req.body;
	Pelicula.getCount(data, function(err, resPelicula){
		if(err){
			console.log("error:" + err.message)
			return res.status(500).send(err.message);
		}		
		if(resPelicula.total > 1){
			Competencia.setCompetencia(data,function(err,resCompetenia){
				if(err){
					console.log("error:" + err.message)
					return res.status(500).send(err.message);
				}			
				return res.status(200).send(JSON.stringify("La competencia se creo con exito"));		
			})
		}else{
			return res.status(422).send("Criterios invalidos para la competencia");	
		}			
	})		
}


function editarNombre(req, res){
	const competenciaId = req.params.id;	
	
	Competencia.editarNombre(competenciaId, req.body.nombre,function(err,result){
		if(err){			
			console.log("error:" + err.message)
			return res.status(422).send("Ese nombre ya existe");
		}			
		return res.status(200).send(JSON.stringify("El nombre se edito con exito"));		
	})	
}


function eliminar(req, res){
	const competenciaId = req.params.id;	
	Competencia.eliminar(competenciaId, function(err,result){
		if(err){
			console.log("error:" + err.message)
			return res.status(500).send(err.messag);
		}			
		return res.status(200).send(JSON.stringify("La competencia se elimino con exito"));		
	})	
}


exports.getAll = getAll;
exports.getCompetencia = getCompetencia;
exports.setCompetencia = setCompetencia;
exports.eliminar = eliminar;
exports.editarNombre = editarNombre;