import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import TopBar from './components/layout/TopBar';
import SideBar from './components/navigation/SideBar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MainNavigation from './routes/MainNavigation';

const App = () => {
    const classes = useStyles();

    return (
        <div>
            <Router basename={process.env.PUBLIC_URL}>

                <div className={classes.root}>

                    <CssBaseline/>
                    <TopBar/>

                    <SideBar/>

                    <MainNavigation/>

                </div>

                {/*<GlobalStatusSnackbar/>*/}
            </Router>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    }
}));

export default App;
