const Voto = require('./../models/voto');

function setVoto(req,res){
	const competenciaId = req.params.id;
	const peliculaId = req.body.idPelicula;
	Voto.setVoto(competenciaId, peliculaId, function(err,result){
		if(err){
			console.log("error:" + err.message)
			return res.status(500).send(err.messag);
		}			
		return res.status(200).send(JSON.stringify("Se guardo el voto"));
	})
}

function getTop3(req,res){
	const competenciaId = req.params.id;
	Voto.getTop3(competenciaId, function(err,result){
		if(err){
			console.log("error:" + err.message)
			return res.status(500).send(err.message);
		}			
		return res.status(200).send(JSON.stringify(result));		
	})
}


function reiniciar(req, res){
	const competenciaId = req.params.id;
	Voto.reiniciar(competenciaId,function(err,result){
		if(err){
			console.log("error:" + err.message)
			return res.status(500).send(err.messag);
		}			
		return res.status(200).send(JSON.stringify("La competencia se reinicio con exito"));		
	})
}

exports.setVoto = setVoto;
exports.getTop3 = getTop3;
exports.reiniciar = reiniciar;