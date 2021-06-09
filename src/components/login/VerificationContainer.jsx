
import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {LinearProgress, Paper} from "@material-ui/core";
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {verifyAction, relog, cancelVerification} from '../../redux/actions/verificationActions';
import ValidatedTextInputField from "../analysis/generic/inputs/ValidatedTextInputField";
import useFieldValidation from "../../utlis/FieldValidation";
import ErrorAlert from "../analysis/generic/feedback/alerts/ErrorAlert";
import {
    validateCode,
    validateEmail,
} from "../../utlis/Validation";

const {
    REACT_APP_BACKEND_URL,
} = process.env;

const VerificationContainer =() => {

    const emailField = useFieldValidation('', validateEmail);
    const codeField = useFieldValidation('', validateCode);
    const [showError, setShowError] = useState(false)
    const history = useHistory();
    const verificationState = useSelector(state => state.verification);
    const dispatch = useDispatch();
    const {
        error,
        verified,
        loading,
        logged
    } = verificationState;

    const verify = () => {
        const verifyRequest = {
            email: emailField.value,
            code: codeField.value
        }
        dispatch(verifyAction(verifyRequest))
    }

    const [submitDisabled, setSubmitDisabled] = useState(true);

    useEffect(() => {
        if (!!emailField.value && !emailField.error && !!codeField.value && !codeField.error) {
            setSubmitDisabled(false);
        } else {
            setSubmitDisabled(true)
        }
    }, [emailField, codeField]);

    useEffect(() => {
        if (!!verified) {
            dispatch(relog())
            history.push('/login')
        }
    }, [verified]);

    useEffect(() => {
        if (error) {
            emailField.setValue('');
            codeField.setValue('');
        }
    }, [error]);

    useEffect(() => {
        if (!verified && !!logged) {
            dispatch(cancelVerification())
        }
    }, [logged]);

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
                    Verify email
                </Typography>
                <form className={classes.form} onSubmit={(e) => {
                    e.preventDefault();
                    verify();
                }}>
                    <ValidatedTextInputField
                        label={'Email'}
                        variant={'outlined'}
                        field={emailField}
                        className={classes.email}
                    />
                    <ValidatedTextInputField
                        label={'Verification code'}
                        variant={'outlined'}
                        field={codeField}
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
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                            className={classes.submit}
                        >
                            Verify email
                        </Button>
                    </div>
                </form>
            </Paper>
        </div>
    )
}

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

export default VerificationContainer;