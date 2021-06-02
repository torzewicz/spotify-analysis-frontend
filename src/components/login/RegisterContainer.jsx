import React, {useCallback, useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import {Link, useHistory} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {LinearProgress, Paper} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import useFieldValidation from "../../utlis/FieldValidation";
import {
    validateEmail,
    validatePasswordOnRegister,
    validateRepeatedPassword,
    validateUsername
} from "../../utlis/Validation";
import {createUserAction} from "../../redux/actions/registerActions";
import ValidatedTextInputField from "../analysis/generic/inputs/ValidatedTextInputField";
import ErrorAlert from "../analysis/generic/feedback/alerts/ErrorAlert";

const {
    REACT_APP_BACKEND_URL,
} = process.env;

const RegisterContainer = () => {

    const logInState = useSelector(state => state.logIn);
    const registerState = useSelector(state => state.register);
    const emailField = useFieldValidation('', validateEmail);
    const usernameField = useFieldValidation('', validateUsername);
    const passwordField = useFieldValidation('', validatePasswordOnRegister);

    const validatePasswordConfirmation = useCallback(validateRepeatedPassword(passwordField.value), [passwordField.value]);
    const passwordRepeatField = useFieldValidation('', validatePasswordConfirmation);
    const dispatch = useDispatch();
    const history = useHistory();

    const [submitDisabled, setSubmitDisabled] = useState(true);

    useEffect(() => {
        if (!!usernameField.value && !usernameField.error && !!passwordField.value && !passwordField.error && !!emailField.value && !emailField.error && !!passwordRepeatField.value && !passwordRepeatField.error) {
            setSubmitDisabled(false);
        } else {
            setSubmitDisabled(true)
        }
    }, [usernameField, passwordField, emailField, passwordRepeatField]);

    const {
        accessToken
    } = logInState;

    const {
        user,
        loading,
        error
    } = registerState;

    useEffect(() => {
        if (!!accessToken) {
            history.push('/')
        }
    }, [accessToken]);

    useEffect(() => {
        if (!loading && !!user) {
            history.push('/verification')
        }
    }, [user]);

    const register = () => {
        const request = {
            username: usernameField.value,
            password: passwordField.value,
            email: emailField.value,
        };
        dispatch(createUserAction(request))
    }
    const classes = useStyles();
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
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <ValidatedTextInputField
                        label={'Email'}
                        variant={'outlined'}
                        field={emailField}
                        className={classes.email}
                    />
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
                    <ValidatedTextInputField
                        label={'Repeat password'}
                        variant={'outlined'}
                        field={passwordRepeatField}
                        isPassword={true}
                    />
                    <div style={{
                        padding: !!error ? 10 : 0,
                        visibility: !!error ? 'visible' : 'hidden',
                        height: !!error ? 80 : 0,
                    }}>
                        <ErrorAlert error={error}/>
                    </div>
                    <div>
                        <LinearProgress style={{
                            visibility: loading ? 'visible' : 'hidden'
                        }}/>
                        <Button
                            disabled={submitDisabled}
                            fullWidth
                            onClick={() => {
                                register()
                            }}
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                    </div>
                    <Grid container>
                        <Grid item xs={12}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center'
                            }}>
                                <Link to={'/login'}>
                                    Sign In
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

export default RegisterContainer;