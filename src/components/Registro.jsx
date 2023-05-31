import React from 'react'
import { db } from '../firebase'

const Registro = (props) => {
    //hooks
  const [lista,setLista]=React.useState([])
  const [id,setId]=React.useState('')
  const [titulo,setTitulo]=React.useState('')
  const [autor,setAutor]=React.useState('')
  const [descripcion,setDescripcion]=React.useState('')
  const [disponibilidad,setDisponibilidad]=React.useState('')
  const [anho,setAnho]=React.useState('')
  const [modoedicion,setModoEdicion]=React.useState(false)
  const [error,setError]=React.useState(null)
  // const [buscar,setBuscar]=React.useState('')

  //leer datos
  React.useEffect(()=>{
    const obtenerDatos=async()=>{
      try {
        //const db=firebase.firestore()
        const data=await db.collection(props.user.email).get()
        //console.log(data.docs);
        const arrayData=data.docs.map(doc=>({id:doc.id,...doc.data()}))
        setLista(arrayData)
      } catch (error) {
        console.error(error);
      }
    }
    obtenerDatos()
  },[])
  //guardar
  const guardarDatos=async(e)=>{
    e.preventDefault()
    if (!titulo) {
      setError("Ingrese el Titulo")
      return
    }
    if (!autor) {
      setError("Ingrese el Autor")
      return
    }
    if (!descripcion) {
      setError("Ingrese el Descripcion")
      return
    }
    if (!disponibilidad) {
      setError("Ingrese la Disponibilidad")
      return
    }
    if (!anho) {
      setError("Ingrese el Año")
      return
    }
    //registrar en firebase
    try {
        //const db=firebase.firestore()
        const nuevoUsuario={titulo,autor,descripcion,disponibilidad,anho}
        const dato=await db.collection(props.user.email).add(nuevoUsuario)
        setLista([
          ...lista,
          {...nuevoUsuario,id:dato.id}
        ])
        setTitulo('')
        setAutor('')
        setDescripcion('')
        setDisponibilidad('')
        setAnho('')
        setError(null)
    } catch (error) {
      console.error(error);
    }
  }
  //eliminar
  
  const eliminarDato=async(id)=>{
    if (modoedicion) {
      setError('No puede eliminar mientras edita el usuario.') 
      return
    }
    try {
        //const db=firebase.firestore()
        await db.collection(props.user.email).doc(id).delete()
        const listaFiltrada=lista.filter(elemento=>elemento.id!==id)
        setLista(listaFiltrada)
    } catch (error) {
      console.error(error);
    }
  }
  //editar
  const editar=(elemento)=>{
    setModoEdicion(true)//activamos el modo edición
    setTitulo(elemento.titulo)
    setAutor(elemento.autor)
    setDescripcion(elemento.descripcion)
    setDisponibilidad(elemento.disponibilidad)
    setAnho(elemento.anho)
    setId(elemento.id)
  }
//editar datos
const editarDatos=async(e)=>{
  e.preventDefault()
    if (!titulo) {
      setError("Ingrese el titulo")
      return
    }
    if (!autor) {
      setError("Ingrese el autor")
      return
    }
    if (!descripcion) {
      setError("Ingrese el Descripcion")
      return
    }
    if (!disponibilidad) {
      setError("Ingrese la Disponibilidad")
      return
    }
    if (!anho) {
      setError("Ingrese el Año")
      return
    }
    try {
        //const db=firebase.firestore()
        await db.collection(props.user.email).doc(id).update({
          titulo,autor
        })
        const listaEditada=lista.map(elemento=>elemento.id===id ? {id,titulo,autor,descripcion,disponibilidad,anho} : 
          elemento
          )
          setLista(listaEditada)//listamos nuevos valores
          setModoEdicion(false)
          setTitulo('')
          setAutor('')
          setId('')
          setDescripcion('')
          setDisponibilidad('')
          setAnho('')
          setError(null)
    } catch (error) {
      console.error(error);
    }
}
// buscar libros
// const handleChange=e=>{
//   setBuscar(e.target.value);
//   filtrar(e.target.value)
// }
// const filtrar=(buscarlibro)=>{
// var resultadoBuscar=lista.filter((elemento)=>{
//   if(elemento.titulo){
//     return elemento
//   }
// })
// setTitulo(resultadoBuscar);
// }

  return (
    <div className='container'>
      {
        modoedicion ? <h2 className='text-center text-success'>Editando Libro</h2> :
        <h2 className='text-center text-primary'>Registro de Libros</h2>
      }
      
      <form onSubmit={modoedicion ? editarDatos : guardarDatos}>
        {
          error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ):
          null
        }
      

        <input type="text" 
        placeholder='Ingrese el Título'
        className='form-control mb-2'
        onChange={(e)=>{setTitulo(e.target.value.trim())}}
        value={titulo}
        />
        <input type="text" 
        placeholder='Ingrese el Autor'
        className='form-control mb-2'
        onChange={(e)=>{setAutor(e.target.value.trim())}}
        value={autor}
        />
        <input type="text" 
        placeholder='Ingrese la Descripcion'
        className='form-control mb-2'
        onChange={(e)=>{setDescripcion(e.target.value.trim())}}
        value={descripcion}
        />
        <select className="form-control mb-2"  onChange={(e)=>{setDisponibilidad(e.target.value.trim())}}
        value={disponibilidad}>
        <option selected value="-1">Disponibilidad</option>
        <option value="1">Si</option>
        
        </select>
      
        <input type="date" 
        placeholder='Ingrese el Año'
        className='form-control mb-2'
        onChange={(e)=>{setAnho(e.target.value.trim())}}
        value={anho}
        />
        <div className='d-grid gap-2'>
          {
            modoedicion ? <button type='submit' className='btn btn-outline-success'>Editar</button> :
            <button type='submit' className='btn btn-outline-info'>Registrar</button>
          }
          
        </div>
      </form>
      <h2 className='text-center text-primary'>Listado de Libros Registrados</h2>
      {/* ---------------- */}
        {/* <input
          className="form-control inputBuscar"
          value={buscar}
          placeholder="Búsqueda por Titulo"
          onChange={handleChange}
        />
        <button className="btn btn-success">
          <FontAwesomeIcon icon={faSearch}/>
        </button> */}
{/* ----------- */}
      <ul className='list-group'>
        {
          lista.map(
            (elemento)=>(
              <li className='list-group-item bg-info' key={elemento.id}>
                {elemento.titulo} {elemento.autor} {elemento.descripcion} {elemento.disponibilidad} {elemento.anho}
                <button 
                onClick={()=>eliminarDato(elemento.id)}
                className='btn btn-danger float-end me-2'>Eliminar</button>
                <button 
                onClick={()=>editar(elemento)}
                className='btn btn-warning float-end me-2'>Editar</button>
                </li>
            )
          )
        }
      </ul>
    </div>
  )
}

export default Registro