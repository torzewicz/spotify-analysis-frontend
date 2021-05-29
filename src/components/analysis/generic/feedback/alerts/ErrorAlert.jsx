import React from 'react';
import Alert from './Alert';
import PropTypes from 'prop-types';

const ErrorAlert = (props) => {
    const {error, message} = props;

    return (
        (!!error || !!message) && (<Alert className={props.className} message={!!message ? message : error.message} severity={'error'}/>)
    );
};

ErrorAlert.propTypes = {
    error: PropTypes.shape({
        message: PropTypes.string
    })
};

export default ErrorAlert;
