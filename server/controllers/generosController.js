const Genero = require('./../models/genero');


function getAll(req,res){
	Genero.getAll(function(err,result){
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


exports.getAll = getAll;