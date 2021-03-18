import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { auth } from '../firebaseconfig'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    header:{ 
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    list:{
        display: 'inline-block',
        listStyle: 'none'
    },
    link:{
        color: '#fff',
        marginLeft: theme.spacing(1),
        textDecoration: 'none'
    }
}))
export const Header = () => {
    const history = useHistory()
    const [usuario, setUsuario] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                setUsuario(user.email)
            }
        })
    },[])
    
    const LogOut = () => {
        auth.signOut()
        setUsuario(null)
        history.push('/')
    }

    const classes = useStyles()
    return(
        <AppBar  position="static">
            <div className={classes.header}>
                {
                    usuario 
                        ? <h4>{usuario}</h4>
                        : <h4>User</h4>
                }
                <ul>
                    <li className={classes.list}><Link className={classes.link} to="/">Inicio</Link></li>
                    { usuario ? '' : <li className={classes.list}><Link className={classes.link} to="/login">Login</Link></li> }
                    { usuario && <li className={classes.list}><Link className={classes.link} to="/products">Products</Link></li>  }
                </ul>
                {
                    usuario 
                        ? <Button 
                            onClick={LogOut} 
                            variant="contained" 
                            color="secondary"
                        >Cerrar Sesión</Button>
                        : ''
                     
                }
            </div>
        </AppBar >
    )
}