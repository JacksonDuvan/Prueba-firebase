import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    msgError: {
        color: theme.palette.error.main,
        marginBottom: theme.spacing(2)
    }
}))

export const FormMessageError = ({ children }) => {
    const classes = useStyles()
    return (
        <p className={classes.msgError}>
            {children}
        </p>
    )
}