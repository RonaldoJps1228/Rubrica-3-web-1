import React from 'react'
import { auth } from '../firebase'
import { useNavigate} from 'react-router-dom'
import Libros from './Libros'

const Usuario = () => {
    const navigate=useNavigate()
    const [user,setUser]=React.useState(null)
    React.useEffect(()=>{
        if (auth.currentUser) {
            console.log('Existe un usuario');
            setUser(auth.currentUser)
        } else {
            console.log('No existe un usuario');
            navigate('/login')
        }
    },[navigate])
return (
    <div>
        
    {
        user && (
            <h3>Usuario: {user.email}</h3>
            
        )
        
    }
    {
        user && (
        
            <Libros user={user}/>
        )
    }

</div>  
)
}

export default Usuario