import React from 'react';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import {makeStyles} from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';

const Alert = (props) => {
    const styles = useStyles();

    const getIcon = (level) => {
        switch (level) {
            case 'error':
                return <ErrorOutlineIcon className={styles.alertIcon}/>;
            case 'warning':
                return <PriorityHighIcon className={styles.alertIcon}/>;
            case 'info':
                return <InfoOutlinedIcon className={styles.alertIcon}/>;
            case 'success':
                return <CheckCircleOutlineOutlinedIcon className={styles.alertIcon}/>;
            default:
                return null;
        }
    };

    return (
        <Paper elevation={6} className={classNames(styles.root, props.className, styles[props.severity])}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
            }}>
                {getIcon(props.severity)}
                <Typography test-id="alert-text" className={styles.text}>
                    {props.message}
                </Typography>
            </div>

            {props.onClose && (
                <IconButton onClick={props.onClose}>
                    <CancelOutlinedIcon className={styles.closeIcon}/>
                </IconButton>
            )}


        </Paper>
    );
};


Alert.propTypes = {
    severity: PropTypes.oneOf(['error', 'warning', 'info', 'success', '']).isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func
};


const useStyles = makeStyles({

    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        paddingRight: 20,
        minWidth: 300
    },
    alertIcon: {
        margin: 12,
        color: '#fff'
    },
    closeIcon: {
        color: '#fff'
    },
    text: {
        color: '#fff'
    },

    error: {
        backgroundColor: '#f44336'
    },
    warning: {
        backgroundColor: '#ff9800'
    },
    info: {
        backgroundColor: '#2196f3'
    },
    success: {
        backgroundColor: '#4caf50'
    },
});

export default Alert;
