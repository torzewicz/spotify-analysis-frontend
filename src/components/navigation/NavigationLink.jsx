import React from 'react';
import {Link} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';

const NavigationLink = (props) => {
    const {
        icon,
        name,
        path,
        onItemClicked,
    } = props;

    const renderLink = React.useMemo(
        () =>
            React.forwardRef((itemProps, ref) => (
                <Link to={path} {...itemProps} ref={ref}/>
            )),
        [path],
    );

    return (
        <ListItem button component={renderLink} onClick={onItemClicked}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={name}/>
        </ListItem>
    );
};

NavigationLink.propTypes = {
    icon: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string,
    onItemClicked: PropTypes.func,
};

export default NavigationLink;