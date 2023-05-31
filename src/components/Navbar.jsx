import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Navbar = (props) => {
    const navigate=useNavigate()
    const cerrarsesion=()=>{
        auth.signOut()
        .then(()=>{
            navigate('/login')
        })
    }
return (
    <div className='navbar navbar-dark bg-dark'>
        <Link className='navbar-brand' to="/"><img src="https://media.discordapp.net/attachments/1075577901891719180/1113247916157575198/luis.png?width=1441&height=501" alt="cuc" width="140"/></Link>
        <div className='d-flex'>
            <Link className='btn btn-dark' to="/">Inicio</Link>
            

            {
                props.firebaseUser !==null ?
                (<Link className='btn btn-dark' to="/usuario">Usuario</Link>):
                null
            }
            {  
                props.firebaseUser !==null ?
                (<Link className='btn btn-dark' to="/admin">Admin</Link>):
                null
            }
            {
                props.firebaseUser !==null ?(
                    <button className='btn btn-dark'
                    onClick={cerrarsesion}
                    >Cerrar Sesión</button>
                ):(
                    <Link className='btn btn-dark' to="/login">Login</Link>
                )
            }
            
        </div>

    </div>
)
}

export default Navbar