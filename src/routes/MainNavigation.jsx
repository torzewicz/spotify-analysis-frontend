import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {makeStyles} from '@material-ui/core';
import SwitchComponent from '../components/analysis/switch/SwitchComponent';
import WelcomeContainer from '../components/welcome/WelcomeContainer';

const MainNavigation = () => {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Switch>

                <Route path='/login'>
                    {/*<SignInFormContainer/>*/}
                    <div>
                        logowanko
                    </div>
                </Route>

                <Route path={'/analysis'}>
                    <SwitchComponent/>
                </Route>
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

