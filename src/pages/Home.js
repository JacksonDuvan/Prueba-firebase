import { useLogIn } from '../hooks/useLogIn'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(themes => ({
    Container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }
}))

export const Home = () => {
    const { user } = useLogIn()
    
    const classes = useStyles()
    return(
        <div className={classes.Container}>
             {
                 user === null 
                    ? <h1>No has iniciado sesión :(</h1>
                    : <h1>Bienvenido</h1>
             }
        </div>
    )
}