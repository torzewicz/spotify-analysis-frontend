import React from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import {matchPath} from 'react-router-dom';
import NavigationLink from './NavigationLink';
import AssessmentIcon from '@material-ui/icons/Assessment';
import {useSelector} from 'react-redux';

const DrawerContent = props => {

    const {
        pathname,
    } = props;

    const logInState = useSelector(state => state.logIn);

    const {
        logged
    } = logInState;


    return (
        <div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>

            <List>

                <NavigationLink
                    name={'Analysis'}
                    IconComponent={AssessmentIcon}
                    path={'/analysis'}
                    active={!!matchPath(pathname, {path: '/analysis'})}
                    visible={logged}
                />

            </List>


            <Divider/>
            {/*<Hidden mdUp implementation={'css'}>*/}
            {/*    <List>*/}
            {/*        <CollapsibleNavigationLink key={'profileMenu'}*/}
            {/*                                   childrenItems={[*/}
            {/*                                       {*/}
            {/*                                           name: 'Preferences',*/}
            {/*                                           IconComponent: BrushIcon,*/}
            {/*                                           path: '/preferences',*/}
            {/*                                           isVisible: true*/}
            {/*                                       },*/}
            {/*                                       {*/}
            {/*                                           name: 'Profile',*/}
            {/*                                           IconComponent: EditIcon,*/}
            {/*                                           path: '/user',*/}
            {/*                                           isVisible: true*/}
            {/*                                       }*/}
            {/*                                   ]}*/}
            {/*                                   isVisible={true}*/}
            {/*                                   name={'Profile'}*/}
            {/*                                   IconComponent={AccountCircleIcon}*/}
            {/*        />*/}

            {/*        {userId && <ListItem button key={'signOut'} onClick={handleLogOut}>*/}
            {/*            <ListItemIcon><ExitToAppIcon/></ListItemIcon>*/}
            {/*            <ListItemText primary={'Sign Out'}/>*/}
            {/*        </ListItem>}*/}
            {/*    </List>*/}
            {/*    <Divider/>*/}
            {/*</Hidden>*/}
        </div>
    );
};

DrawerContent.propTypes = {};

export default DrawerContent;
