import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";

function App() {
  const [busqueda, guardarBusqueda] = useState("");
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

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
      guardarImagenes(resultado.hits);
      //calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(
        resultado.totalHits / imagenesPorPagina
      );
      guardarTotalPaginas(calcularTotalPaginas);
    };

    consultarApi();
  }, [busqueda]);

  //definir la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    if (nuevaPaginaActual === 0) return;
    guardarPaginaActual(nuevaPaginaActual);
  };

  return (
    <Fragment>
      <div className="container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imágenes</p>
          <Formulario guardarBusqueda={guardarBusqueda} />
        </div>
        <div className="row justify-content-center">
          <ListadoImagenes imagenes={imagenes} />
          <button
            onClick={paginaAnterior}
            className="btn btn-info mr-1"
            type="button"
          >
            &laquo; Anterior
          </button>
          <button className="btn btn-info" type="button">
            Siguiente &raquo;
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
