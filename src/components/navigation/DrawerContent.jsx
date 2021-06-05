import React, {useEffect, useMemo} from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import {useHistory} from 'react-router-dom';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {useDispatch, useSelector} from 'react-redux';
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import packageJson from '../../../package.json';
import {logOut} from "../../redux/actions/logInActions";
import {fetchUserAction} from "../../redux/actions/userActions";
import NavigationList from "./NavigationList";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const DrawerContent = props => {

    const {
        pathname,
    } = props;

    const logInState = useSelector(state => state.logIn);
    const {user} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const {
        isAuthenticated
    } = logInState;

    const handleLogOut = () => {
        dispatch(logOut());
        history.push("/login")
    };

    useEffect(() => {
        if (!user) {
            dispatch(fetchUserAction())
        }
    }, []);

    const {
        connectedToSpotify,
        role
    } = user || {};

    const menuItems = useMemo(() => [
        {
            name: 'Analysis',
            icon: <AssessmentIcon/>,
            path: '/analysis',
            visible: isAuthenticated && connectedToSpotify
        },
        {
            name: "Admin",
            icon: <SupervisorAccountIcon/>,
            path: `/admin`,
            visible: isAuthenticated && role === "ADMIN"
        }
    ], [isAuthenticated, user]);


    const DrawerContent = ({menuItems}) => (
        <div>
            <Divider/>
            <NavigationList menuItems={menuItems}/>
        </div>
    );

    return (
        <div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>

            <DrawerContent menuItems={menuItems}/>

            <Divider/>

            {isAuthenticated ? <List>
                    <ListItem button onClick={() => handleLogOut()}>
                        <ListItemIcon>{<ExitToAppIcon/>}</ListItemIcon>
                        <ListItemText primary={'Log Out'}/>
                    </ListItem>
                </List> :
                <List>
                    <ListItem button onClick={() => history.push("/login")}>
                        <ListItemIcon>{<VpnKeyIcon/>}</ListItemIcon>
                        <ListItemText primary={'Login'}/>
                    </ListItem>
                </List>}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}>
                <div style={{flexGrow: 1}}/>
                <Typography style={{fontSize: 13}} color={'textSecondary'}>
                    {`v${packageJson.version}`}
                </Typography>
            </div>
        </div>
    );
};

DrawerContent.propTypes = {};

export default DrawerContent;
