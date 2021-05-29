import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logIn} from '../../redux/actions/logInActions';
import {LinearProgress, Paper} from "@material-ui/core";
import {validatePasswordOnRegister, validateUsername} from "../../utlis/Validation";
import useFieldValidation from "../../utlis/FieldValidation";
import ValidatedTextInputField from "../analysis/generic/inputs/ValidatedTextInputField";


const LoginContainer = () => {

    const classes = useStyles();

    const usernameField = useFieldValidation('', validateUsername);
    const passwordField = useFieldValidation('', validatePasswordOnRegister);
    const history = useHistory();
    const logInState = useSelector(state => state.logIn);
    const dispatch = useDispatch();

    const [submitDisabled, setSubmitDisabled] = useState(true);

    useEffect(() => {
        if (!!usernameField.value && !usernameField.error && !!passwordField.value && !passwordField.error) {
            setSubmitDisabled(false);
        } else {
            setSubmitDisabled(true)
        }
    }, [usernameField, passwordField]);

    const {
        accessToken,
        loading,
        error
    } = logInState;

    const login = () => {

        const loginRequest = {
            username: usernameField.value,
            password: passwordField.value
        }
        dispatch(logIn(loginRequest))
    }

    useEffect(() => {
        if (!!accessToken) {
            history.push('/')
        }
    }, [accessToken]);

    useEffect(() => {
        if (error) {
            usernameField.setValue('');
            passwordField.setValue('');
        }
    }, [error]);


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
        }}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={(e) => {
                    e.preventDefault();
                    login();
                }}>

                    <ValidatedTextInputField
                        label={'Username'}
                        variant={'outlined'}
                        field={usernameField}
                    />

                    <ValidatedTextInputField
                        label={'Password'}
                        variant={'outlined'}
                        field={passwordField}
                        isPassword={true}
                    />

                    <div>
                        <LinearProgress style={{
                            visibility: loading ? 'visible' : 'hidden'
                        }}/>
                        <Button
                            disabled={submitDisabled}
                            fullWidth
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                    </div>
                    <Grid container>
                        <Grid item xs={12}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center'
                            }}>
                                <Link to={'/register'}>
                                    Don't have an account? Sign Up
                                </Link>
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    )
};

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(4),
        margin: theme.spacing(8),
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


export default LoginContainer;