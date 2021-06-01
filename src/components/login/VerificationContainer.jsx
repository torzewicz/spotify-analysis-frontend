
import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {logIn, verified} from '../../redux/actions/logInActions';

const {
    REACT_APP_BACKEND_URL,
} = process.env;

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


const VerificationContainer =() => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [showError, setShowError] = useState(false)
    const history = useHistory();
    const logInState = useSelector(state => state.logIn);
    const dispatch = useDispatch();
    const {
        logged,
        verified,
        accessToken
    } = logInState;

    const login = () => {
        if(logged && !verified){
            axios.post(`${REACT_APP_BACKEND_URL}/auth/verify`, {
                email: email,
                code: code
            }).then(({data}) => {
                console.log(data)
                dispatch(verified(data))
                history.push('/')
            }).catch(error => {
                setShowError(true);
            })
        }
    }
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Verify email
            </Typography>
            <form className={classes.form} noValidate>
                <TextField
                    onChange={(e)=>{setEmail(e.target.value)}}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoFocus
                />
                
                <TextField
                    onChange={(e)=>{setCode(e.target.value)}}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="code"
                    label="Verification code"
                    id="code"
                />
                {showError ? <Alert className="hidden" severity="error">Verification failed — try again!</Alert> : null }
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={()=>{login()}}
                >
                Verify email
                </Button>
            </form>
            </div>
      </Container>
    )
}
export default VerificationContainer;