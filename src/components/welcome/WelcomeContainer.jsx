import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import spotifyLogo from '../../assets/logo_spotify.svg.webp';
import Paper from '@material-ui/core/Paper';
import {useHistory, useLocation} from 'react-router-dom';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {logIn, verified} from '../../redux/actions/logInActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import TrackComponent from '../analysis/tracks/TrackComponent';
import {connectSpotifyAction, fetchUserAction} from "../../redux/actions/userActions";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";

const clientId = '14f9f4dd0f2a47cab4ae8dca428fad0b';

const {
    REACT_APP_BACKEND_URL,
} = process.env;

const WelcomeContainer = () => {

    const classes = useStyles();

    const location = useLocation();
    const query = new URLSearchParams(useLocation().search);
    const dispatch = useDispatch();
    const {accessToken} = useSelector(state => state.logIn);
    const userState = useSelector(state => state.user);
    const [currentPlaying, setCurrentPlaying] = useState(undefined);
    const history = useHistory();

    const {
        loading,
        user,
    } = userState;

    useEffect(() => {
        if (!user) {
            dispatch(fetchUserAction())
        } else {
            const intervalId = fetchCurrentTrack();

            return () => {
                if (!!intervalId) {
                    clearInterval(intervalId);
                }
            }
        }

    }, [user]);

    useEffect(() => {
        if (!!query.get('code') && !!user && !user.connectedToSpotify) {
            const returnLocation = `${window.location.protocol}//${window.location.hostname}`
            console.log(returnLocation)
            dispatch(connectSpotifyAction(query.get('code'), returnLocation));
        }
    }, [query.get('code'), user]);

    const fetchCurrentTrack = () => {
        if (!!user && user.connectedToSpotify && !!accessToken) {
            if (location.pathname !== '/') {
                history.push('/');
            }
            return setInterval(() => {
                if (!!accessToken) {
                    axios.get(`${REACT_APP_BACKEND_URL}/spotify-user/current`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    })
                        .then(({data}) => {
                            setCurrentPlaying(data);
                        })
                        .catch(e => {
                            console.log(e)
                        });
                }
            }, 1000);
        } else {
            return undefined;
        }
    };

    return (
        <div className={classes.mainDiv}>
            <div className={classes.mainMainDiv}>
                {(!!user && !user.connectedToSpotify) ? <div>
                    <Typography variant={'h5'} color={'textSecondary'}>Your account is not connected to Spotify, do it
                        now</Typography>
                    <div className={classes.connectSpotify}>
                        <Paper elevation={6} onClick={() => {
                            const returnLocation = `${window.location.protocol}//${window.location.hostname}`
                            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${returnLocation}&scope=user-top-read,user-read-playback-state,user-read-playback-state`
                        }} className={classes.logo}>
                            <img style={{
                                width: 80
                            }} src={spotifyLogo} alt={'logo'}/>

                        </Paper>
                        {loading && <CircularProgress size={80} className={classes.progress}/>}
                    </div>
                </div> : (!!user ? (<div className={classes.loggedDiv}>
                    <div className={classes.textDiv}>
                        <Typography variant={'h3'} color={'textSecondary'}>You are logged</Typography>
                    </div>
                    {!!currentPlaying &&
                    <div className={classes.currentTrack}>
                        <Typography variant={'h5'} color={'textSecondary'}>Currently listening to</Typography>
                        <TrackComponent track={currentPlaying.item} atMinute={currentPlaying.progress_ms}/>
                    </div>}

                </div>) : <div className={classes.loggedDiv}>
                    <Typography variant={'h3'} color={'textSecondary'}>Welcome</Typography>
                    <div>
                        <Button color={'primary'} variant={'contained'} onClick={() =>
                            history.push('/login')}>
                            Login
                        </Button>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    mainDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    mainMainDiv: {
        marginTop: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    connectSpotify: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative'
    },
    logo: {
        position: 'absolute',
        borderRadius: 40,
        overflow: 'hidden',
        width: 80,
        height: 80,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        cursor: 'pointer'
    },
    progress: {
        position: 'absolute',
        zIndex: 1,
    },
    loggedDiv: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center'
    },
    textDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    currentTrack: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    }
}));

export default WelcomeContainer;