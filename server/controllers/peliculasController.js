const Pelicula = require('./../models/pelicula');


function getOptions(req,res){	
	const competenciaId = req.params.id;
	Pelicula.getOptions(competenciaId, function(err,result){
		if(err){
			console.log("error:" + err.message)
			return res.status(500).send(err.messag);
		}

		if(result.length == 0){
			return res.status(400).send("Las opciones no existen");
		}

		var peliculas = desordenarArray(result);
		const data = {
			competencia: "C O M P E T E N C I A",
			peliculas: peliculas
		}		
		return res.status(200).send(JSON.stringify(data));
	})
}

function desordenarArray(array) {

    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

exports.getOptions = getOptions;