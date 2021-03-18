import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import { auth, db } from '../firebaseconfig'
import { FormMessageError } from '../components/FormMessageError'


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    form:{
        border: '1px solid rgba(0,0,0,.2)',
        padding: theme.spacing(5),
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,.2)'
    },
    input: {
        display: 'block',
        marginBottom: theme.spacing(1)
    },
    text:{
        textAlign: 'center'
    },
    btn: {
        marginBottom: theme.spacing(1)
    },
    msgError: {
        color: theme.palette.error.main,
        marginBottom: theme.spacing(2)
    }
}))

export const Login = () => {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [msgerror, setMsgerror] = useState(null)
    const [required, setRequired] = useState('')
  
    const RegisterUser = async () => {
        try {
            if(email === '' || pass === ''){
                setRequired('Debes de completar los campos')
                return
            }
            const res = await auth.createUserWithEmailAndPassword(email, pass)
            await db.collection('users').doc(res.user.uid).set({
                email: res.user.email,
                uid: res.user.uid
            })
            await db.collection(res.user.uid).add({
                name: 'Product 1',
                description: 'El mejor producto',
                stock: 5,
                price: 10
            })
            setMsgerror(null)
            setEmail('')
            setPass('')
            history.push('/')
        } catch (err) {
            setMsgerror(err.code)
        }    
    }
    const LoginUser = async () => {
        try {
            if(email === '' || pass === ''){
                setRequired('Debes de completar los campos')
                return
            }
            await auth.signInWithEmailAndPassword(email, pass)
            setMsgerror(null)
            setEmail('')
            setPass('')
            history.push('/')
        } catch (err) {
            setMsgerror(err.code)
        }
    }
    
    const classes = useStyles()
    return(
            <div className={classes.container}>
                <form className={classes.form}>
                    {   
                        required === '' 
                            ? ''
                            : <FormMessageError>{required}</FormMessageError>
                    }
                    {
                        msgerror === 'auth/email-already-in-use' 
                            && <FormMessageError>Este usuario ya existe</FormMessageError>
                    }
                    <TextField 
                        fullWidth
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={classes.input} 
                        id="outline-basic" 
                        label="Correo" 
                        variant="outlined" 
                    />

                    { 
                        msgerror === 'auth/invalid-email' 
                            && <FormMessageError>
                                    Formato de email incorrecto
                                </FormMessageError>
                    }

                    { 
                        msgerror === 'auth/user-not-found' 
                            && <FormMessageError>
                                    Este usuario no existe
                                </FormMessageError>
                    }

                    <TextField 
                        fullWidth
                        type="password" 
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                        className={classes.input} 
                        id="outlined-basic" 
                        label="Contraseña" 
                        variant="outlined" 
                    />

                    { 
                        msgerror === 'auth/weak-password' 
                            && <FormMessageError>
                                La password debe tener 6 caracteres o mas
                            </FormMessageError>
                    }

                    { 
                        msgerror === 'auth/wrong-password'
                            && <FormMessageError>
                                La contraseña es incorrecta o usuario no tiene contraseña
                            </FormMessageError>
                    }

                    <Button 
                        fullWidth
                        onClick={RegisterUser}
                        className={classes.btn} 
                        variant="contained" 
                        color="primary"
                    >Registrar Usuario</Button>

                    <Button 
                        fullWidth
                        onClick={LoginUser}
                        className={classes.btn} 
                        variant="contained" 
                        color="secondary"
                    >Iniciar Sesión</Button>
                </form>
            </div>
        )
}