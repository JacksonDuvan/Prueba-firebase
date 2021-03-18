import { useRef, useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useLogIn } from '../hooks/useLogIn'
import { db } from '../firebaseconfig'

const useStyles = makeStyles(themes => ({
    products: {
        with: '100%',
        display: 'flex',
        justifyContent: 'space-arpund'
    },
    form:{
        // width: '30%',
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        marginBottom: themes.spacing(2)
    },
    container: {
        backgroundColor: themes.palette.primary,
        color: '#fff',
        width: '300px',
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

export const FormProducts = () => {
    const [products, setProducts] = useState([])
    const form = useRef(null)
    const { user } = useLogIn()
    const classes = useStyles()
    const getProducts = async () => {
        if(user){
            return
        }
        try{
           
            const { docs } = await db.collection(String(user)).get()

            const arrayData = docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setProducts(arrayData)
        }catch(err){
            console.log(err)
        }
    }


    useEffect(() => {
        getProducts()
        console.log({ products })
    },[])

    const addProduct = async (e) => {
        e.preventDefault()
        try{
            const formData = new FormData(form.current)
            const newProduct = {
                name: formData.get('name'),
                description: formData.get('description'),
                stock: formData.get('stock'),
                price: formData.get('price')
            }
            const data = await db.collection(user).add(newProduct)
            console.log(data.id)
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className={classes.products}>
             <form onSubmit={addProduct} className={classes.form} ref={form}>
            <h1>Agregar un producto</h1>
           <TextField 
                name="name"
                className={classes.input}
                type="text"
                id="outline-basic" 
                label="Nombre" 
                variant="outlined" 
            />
            <TextField 
                name="description"
                className={classes.input}  
                type="text"
                id="outline-basic" 
                label="Descripción" 
                variant="outlined" 
                multiline
            />
            <TextField
                name="stock"
                className={classes.input} 
                type="number"
                id="outline-basic" 
                label="Valor" 
                variant="outlined" 
            />
            <TextField 
                name="price"
                className={classes.input}
                type="number"
                id="outline-basic" 
                label="Precio" 
                variant="outlined" 
            />
            <Button 
                type="submit" 
                variant="contained" 
                color="primary"
            >Agregar</Button>
        </form>
        {
            products.map(product => (
                <div className={classes.container} key={product.id}> 
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                    <p>{product.stock}</p>
                    <p>${product.price}</p>
                </div>
            ))
        }
        </div>
       
    )
}