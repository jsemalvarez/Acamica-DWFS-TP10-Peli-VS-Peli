const express = require("express");

function setup(app, handlers) {

  const competenciasRouter = express.Router();
  competenciasRouter.get("/:id", handlers.competencias.getCompetencia);
  competenciasRouter.get("/", handlers.competencias.getAll);
  competenciasRouter.get("/:id/peliculas", handlers.peliculas.getOptions);
  competenciasRouter.post("/:id/voto", handlers.votos.setVoto);
  competenciasRouter.get("/:id/resultados", handlers.votos.getTop3);
  competenciasRouter.post("/", handlers.competencias.setCompetencia);
  competenciasRouter.delete("/:id/votos", handlers.votos.reiniciar);
  competenciasRouter.delete("/:id", handlers.competencias.eliminar);
  competenciasRouter.put("/:id", handlers.competencias.editarNombre);
  app.use("/competencias", competenciasRouter);


  const generosRouter = express.Router();
  generosRouter.get("/", handlers.generos.getAll);
  app.use("/generos", generosRouter);


  const directoresRouter = express.Router();
  directoresRouter.get("/", handlers.directores.getAll);
  app.use("/directores", directoresRouter);


  const actoresRouter = express.Router();
  actoresRouter.get("/", handlers.actores.getAll);
  app.use("/actores", actoresRouter);
};

exports.setup = setup;