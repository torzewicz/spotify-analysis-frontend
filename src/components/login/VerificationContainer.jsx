
import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {verifyAction, relog} from '../../redux/actions/verificationActions';

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
    const verificationState = useSelector(state => state.verification);
    const dispatch = useDispatch();
    const {
        error,
        verified,
    } = verificationState;

    const verify = () => {
        const verifyRequest = {
            email: email,
            code: code
        }
        dispatch(verifyAction(verifyRequest))
    }

    useEffect(() => {
        if (!!verified) {
            dispatch(relog())
            history.push('/login')
        }
    }, [verified]);

    useEffect(() => {
        if (error) {
            setShowError(true);
        }
    }, [error]);

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
                    onClick={()=>{verify()}}
                >
                Verify email
                </Button>
            </form>
            </div>
      </Container>
    )
}
export default VerificationContainer;