import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import {toggleSidebarAction} from '../../redux/actions/layoutActions';

const TopBar = () => {

    const styles = useStyles();
    const history = useHistory();

    const handleLoginButtonClicked = () => {
        history.push('/login');
    };

    const dispatch = useDispatch();


    // const {isAuthenticated} = useSelector(state => state.auth);

    const [profileMenuAnchorEl, setProfileMenuAnchorEl] = React.useState(null);

    const handleProfileMenuOpen = (event) => {
        setProfileMenuAnchorEl(event.currentTarget);
    };

    return (
        <AppBar position={'fixed'} variant={'elevation'}>
            <Toolbar variant={'dense'}>
                <IconButton
                    color={'inherit'}
                    onClick={() => dispatch(toggleSidebarAction())}
                >
                    <MenuIcon/>
                </IconButton>
                {/*<img*/}
                {/*    src={'/white_logo.svg'}*/}
                {/*    className={styles.logo}*/}
                {/*    alt={'Company Logo'}*/}
                {/*    onClick={() => {*/}
                {/*        history.push('/');*/}
                {/*    }}*/}
                {/*/>*/}

                <Typography variant={'h6'} noWrap>
                    Spotify App
                </Typography>
                <div className={styles.grow}/>

                <div className={styles.sectionDesktop}>
                    {/*{isAuthenticated ?*/}
                    {/*    <div style={{*/}
                    {/*        display: 'flex',*/}
                    {/*        flexDirection: 'row',*/}
                    {/*        alignItems: 'center'*/}
                    {/*    }}>*/}
                    {/*        <Typography style={{*/}
                    {/*            fontSize: 16*/}
                    {/*        }}>{fullName || username}</Typography>*/}
                    {/*        <IconButton*/}
                    {/*            edge={'end'}*/}
                    {/*            onClick={handleProfileMenuOpen}*/}
                    {/*            color={'inherit'}*/}
                    {/*        >*/}
                    {/*            <AccountCircleIcon/>*/}
                    {/*        </IconButton>*/}
                    {/*    </div>*/}
                    {/*    :*/}
                    {/*    <Button onClick={handleLoginButtonClicked} color={'inherit'}>*/}
                    {/*        Zaloguj się*/}
                    {/*    </Button>*/}
                    {/*}*/}

                    {/*<ProfileMenu open={!!profileMenuAnchorEl}*/}
                    {/*             anchorEl={profileMenuAnchorEl}*/}
                    {/*             onClose={() => setProfileMenuAnchorEl(null)}/>*/}
                </div>
            </Toolbar>


        </AppBar>
    );
};

const logoHeight = 40;

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    logo: {
        height: logoHeight,
        padding: 5,
        '&:hover': {
            cursor: 'pointer'
        },
    },
    projectAndLanguage: {
        width: 320,
        marginLeft: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}));

export default TopBar;




