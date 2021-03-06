import React from 'react';
import {Route, Switch} from 'react-router-dom';
import PrivateRoute from './PrivateRoute'

import {makeStyles} from '@material-ui/core';
import SwitchComponent from '../components/analysis/switch/SwitchComponent';
import WelcomeContainer from '../components/welcome/WelcomeContainer';
import LoginContainer from '../components/login/LoginContainer';
import RegisterContainer from '../components/login/RegisterContainer';
import VerificationContainer from '../components/login/VerificationContainer';
import UserList from '../components/admin/userList/UserList'

const MainNavigation = () => {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Switch>

                <Route path='/login'>
                    <LoginContainer/>
                </Route>
                <Route path='/register'>
                    <RegisterContainer/>
                </Route>
                <Route path='/verification'>
                    <VerificationContainer/>
                </Route>
                <PrivateRoute path={'/analysis/:accountName'}>
                    <SwitchComponent/>
                </PrivateRoute>
                <PrivateRoute path={'/analysis'}>
                    <SwitchComponent/>
                </PrivateRoute>

                <PrivateRoute path={'/admin'}>
                    <UserList/>
                </PrivateRoute>
                <Route path={'/'}>
                    <WelcomeContainer/>
                </Route>

                {/*<Route>*/}
                {/*    <PageNotFoundComponent/>*/}
                {/*</Route>*/}

            </Switch>
        </main>);
};

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    toolbar: {
        minHeight: 48
    }
}));

export default MainNavigation;

