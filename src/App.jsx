import React, { useState } from 'react'
import Header from './Header';
import api from './apiComponent.jsx'
const App = () => {
  const [listaTareas, setListaTareas] = useState([]);
  
  return (
    <>
    <apiComponents/>
   
    </>
    
  )
}

export default App;


//Rafc para funciones de flecha 
//elimina la carpeta assets
//elimina archivo app.css y el index.css
//<></> retornar varios elementos sin poner div 
//usestatesnippe 
//para utilizar variables js se utiliza {}
//preprocesador react npm run build
//en las etiquetas de los componentes ctl + espacio para importar 