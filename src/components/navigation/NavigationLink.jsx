import React from 'react';
import {Link} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import {closeSidebarAction} from '../../redux/actions/layoutActions';
import {useDispatch} from 'react-redux';

const NavigationLink = (props) => {
    const {
        IconComponent,
        name,
        path,
        onItemClicked,
        collapsible,
        open,
        isNested = false,
        active,
        visible
    } = props;

    const styles = useStyles();
    const dispatch = useDispatch();

    const renderLink = React.useMemo(
        () =>
            React.forwardRef((itemProps, ref) => (
                collapsible ? <Typography component={'span'} {...itemProps}/> :
                    <Link to={path} {...itemProps} ref={ref} onClick={() => dispatch(closeSidebarAction())}/>
            )),
        [path, collapsible],
    );

    return (
        visible && <li>
            <ListItem button component={renderLink} onClick={onItemClicked}
                      className={isNested ? styles.nestedItem : null}>
                {
                    IconComponent && (
                        <ListItemIcon><IconComponent color={active ? 'primary' : 'inherit'}/></ListItemIcon>
                    )
                }
                <ListItemText
                    primaryTypographyProps={{color: active ? 'primary' : 'textPrimary'}}
                    secondaryTypographyProps={{color: active ? 'primary' : 'textSecondary'}}
                    primary={!isNested && name}
                    secondary={isNested && name}/>
                {collapsible && (open ? <ExpandLess/> : <ExpandMore/>)}
            </ListItem>
        </li>
    );
};

NavigationLink.propTypes = {
    IconComponent: PropTypes.elementType,
    name: PropTypes.string.isRequired,
    path: PropTypes.string,
    onItemClicked: PropTypes.func,
    collapsible: PropTypes.bool,
    open: PropTypes.bool,
    isNested: PropTypes.bool,
    active: PropTypes.bool,
    visible: PropTypes.bool
};

export default NavigationLink;

const useStyles = makeStyles(theme => ({
    nestedItem: {
        paddingLeft: theme.spacing(4),
    }
}));
