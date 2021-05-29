import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';

const ValidatedTextInputField = (props) => {

    const styles = useStyles();

    const {
        field: {
            value,
            error,
            handleBlur = () => null,
            handleChange = () => null,
            disabled
        },
        isPassword
    } = props;

    return (
        <div className={styles.root}>
            <TextField
                {...props}
                value={value}
                type={!!isPassword ? 'password' : 'text'}
                error={!!error}
                onBlur={handleBlur}
                helperText={(error && error.message) || ''}
                onChange={handleChange}
                disabled={disabled}
                style={{flex: 1}}
            />
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        padding: theme.spacing(2),
        height: 100,
        width: 500
    }
}));

ValidatedTextInputField.propTypes = {
    field: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.object,
        handleBlur: PropTypes.func,
        handleChange: PropTypes.func,
        disabled: PropTypes.bool
    }).isRequired,
    // isPassword: PropTypes.bool,
    disabled: PropTypes.bool
};

export default ValidatedTextInputField;
