import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";

function App() {
  const [busqueda, guardarBusqueda] = useState("");
  useEffect(() => {
    const consultarApi = async () => {
      if (!busqueda) {
        return;
      }
      const imagenesPorPagina = 30;
      const key = "16480983-147bb2936f6142e1f93881971";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarBusqueda(resultado.hits);
    };

    consultarApi();
  }, [busqueda]);

  return (
    <Fragment>
      <div className="container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imágenes</p>
          <Formulario guardarBusqueda={guardarBusqueda} />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
