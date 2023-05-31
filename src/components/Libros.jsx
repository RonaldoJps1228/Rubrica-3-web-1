import React from 'react'
import { db } from '../firebase'


const Libros = (props) => {
    const [lista,setLista]=React.useState([])
    const [id,setId]=React.useState('')
    const [titulo,setTitulo]=React.useState('')
    const [autor,setAutor]=React.useState('')
    const [descripcion,setDescripcion]=React.useState('')
    const [disponibilidad,setDisponibilidad]=React.useState('')
    const [anho,setAnho]=React.useState('')
    const [modoedicion,setModoEdicion]=React.useState(false)
    const [error,setError]=React.useState(null)
    const [libro,setLibro]=React.useState([])
    const [registroLibros, setRegistroLibros] = React.useState([])

    //Actualiza la función editar para mover el libro a la lista de registro de libros:
const prestarLibro = (elemento) => {
    // Agregar el libro a la lista de registro de libros
    setRegistroLibros([...registroLibros, elemento]);
  
    const nuevaLista = lista.filter((item) => item.id !== elemento.id);
    setLista(nuevaLista);
  };
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

//Buscador
    React.useEffect(() =>{
        const fetchlibro = async () =>{
            try {
                const data = await db.collection(props.user.email).get()
                const arrayData = data.docs.map(doc =>({id:doc.id,...doc.data()}))

                setLibro(arrayData)
                
        }catch (error){
            console.error(error)
        }
        }
        fetchlibro()
    },[]) 


// --------------
// const handleSearch=e=>{
//         setBuscarTermino(e.target.value);
//         filtrar(e.target.value)
//     }
//     const filtrar = titulo.filter((titulo)=>
//     titulo.titulo.toLowerCase().includes(buscartermino.toLowerCase())
//     )

    const editar=(elemento)=>{
        setModoEdicion(true)//activamos el modo edición
        setTitulo(elemento.titulo)
        setAutor(elemento.autor)
        setDescripcion(elemento.descripcion)
        setDisponibilidad(elemento.disponibilidad)
        setAnho(elemento.anho)
        setId(elemento.id)
      }

      const editarDatos=async(e)=>{
        e.preventDefault()
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

return (
    <div className='container'>
        <h2>Buscador</h2>
        <select>
            
{lista.map((titulo) =>
<option key={titulo.id} value={titulo.id}>
    {libro.titulo}
</option>
)}
        </select>
    <h2 className='text-center text-primary'>Listado de Libros</h2>
    <ul className='list-group'>
        {
        lista.map(
            (elemento)=>(
            <li className='list-group-item bg-info' key={elemento.id}>
                {elemento.titulo} {elemento.autor} {elemento.descripcion} {elemento.disponibilidad} {elemento.anho}
                <button 
                // onClick={()=>editar(elemento)}
                className='btn btn-warning float-end me-2'>Prestar</button>
                </li>
            )
        )
        }
    </ul>
        {
        modoedicion ? <h2 className='text-center text-success'>Editando Libro</h2> :
        <h2 className='text-center text-primary'>Libros Prestados</h2>
        }
        
    </div>
)
}

export default Libros