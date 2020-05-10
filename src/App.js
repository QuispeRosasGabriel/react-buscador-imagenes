import React, { Fragment } from "react";
import Formulario from "./components/Formulario";

function App() {
  return (
    <Fragment>
      <div className="container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imágenes</p>
          <Formulario />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
