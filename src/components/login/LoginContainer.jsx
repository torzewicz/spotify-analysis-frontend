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
import {logIn, verifyAction} from '../../redux/actions/logInActions';
import store from '../../redux/store';

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


const LoginContainer =() => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
        console.log(store.getState())
        if(!accessToken){
            axios.post(`${REACT_APP_BACKEND_URL}/auth/login`, {
                username: username,
                password: password
            }).then(({data}) => {
                dispatch(logIn(data))
                if(data.token) {
                    dispatch(verifyAction(data))
                    history.push('/');
                } else {
                    history.push('/verification');
                }
            }).catch(error => {
                setShowError(true);
            })
        } else {
            history.push('/');
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
                Sign in
            </Typography>
            <form className={classes.form} noValidate>
                <TextField
                    onChange={(e)=>{setUsername(e.target.value)}}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Username"
                    name="username"
                    autoFocus
                />
                
                <TextField
                    onChange={(e)=>{setPassword(e.target.value)}}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                 {showError ? <Alert className="hidden" severity="error">Login failed — try again!</Alert> : null }
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={(e)=>{e.preventDefault();login()}}
                >
                Sign In
                </Button>
                <Grid container>
                <Grid item xs>
                    {/* <Link to={'/'} variant="body2">
                    Forgot password?
                    </Link> */}
                </Grid>
                <Grid item>
                    <Link to={'/register'}>
                    Don't have an account? Sign Up
                    </Link>
                </Grid>
                </Grid>
            </form>
            </div>
      </Container>
    )
}
export default LoginContainer;