import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import spotifyLogo from '../../assets/logo_spotify.svg.webp';
import Paper from '@material-ui/core/Paper';
import {useLocation, useHistory} from 'react-router-dom';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {logIn, connectedToSpotify, verified} from '../../redux/actions/logInActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import TrackComponent from '../analysis/tracks/TrackComponent';

const clientId = '14f9f4dd0f2a47cab4ae8dca428fad0b';

const {
    REACT_APP_BACKEND_URL,
} = process.env;

const WelcomeContainer = () => {

    const query = new URLSearchParams(useLocation().search);
    const dispatch = useDispatch();
    const logInState = useSelector(state => state.logIn);
    const [loading, setLoading] = useState(false);
    const [currentPlaying, setCurrentPlaying] = useState(undefined);

    const history = useHistory();

    const {
        connectedToSpotify,
        verified,
        accessToken
    } = logInState;

    // useEffect(() => {
    //     if (!!query.get('code') && !logged) {
    //         setLoading(true);
    //         axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/connect`, {
    //             params: {
    //                 code: query.get('code')
    //             }
    //         })
    //             .then(({data}) => {
    //                 dispatch(logIn(data));
    //                 history.push('/')

    //             })
    //     }
    // }, [query.get('code')]);

    const fetchCurrentTrack = () => {
        setInterval(() => {
            if (accessToken) {
                console.log(accessToken)
                // axios.get(`${REACT_APP_BACKEND_URL}/spotifyuser/current`, {
                //     headers: {
                //         Authorization: `Bearer ${accessToken}`,
                //     }
                // })
                //     .then(({data}) => {
                //         setCurrentPlaying(data);
                //     })
                //     .catch(e => {
                //         console.log(e)
                //     });
                    axios.get(`${REACT_APP_BACKEND_URL}/user`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    })
                        .then(({data}) => {
                            console.log(data);
                            dispatch(connectedToSpotify(data));
                        })
            }
        }, 1000);
    };


    useEffect(() => {
        //fetchCurrentTrack();
    }, [accessToken]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%'
        }}>
            <div style={{
                marginTop: 50,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
            }}>
                {!connectedToSpotify ? <div>
                    <Typography variant={'h3'} color={'textSecondary'}>Log in with Spotify</Typography>
                    <div style={{
                        marginTop: 20,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        position: 'relative'
                    }}>
                        <Paper elevation={6} onClick={() => {
                            setLoading(true);
                            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3000&scope=user-top-read,user-read-playback-state,user-read-playback-state`
                        }} style={{
                            position: 'absolute',
                            borderRadius: 40,
                            overflow: 'hidden',
                            width: 80,
                            height: 80,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}>
                            <img style={{
                                width: 80
                            }} src={spotifyLogo} alt={'logo'}/>

                        </Paper>
                        {loading && <CircularProgress size={80} style={{
                            position: 'absolute',
                            zIndex: 1,
                        }}/>}
                    </div>
                </div> : <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '100%'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <Typography variant={'h3'} color={'textSecondary'}>You are logged</Typography>
                    </div>
                    {!!currentPlaying &&
                    <div style={{
                        marginTop: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Typography variant={'h5'} color={'textSecondary'}>Currently listening to</Typography>
                        <TrackComponent track={currentPlaying.item} atMinute={currentPlaying.progress_ms}/>
                    </div>}

                </div>}
            </div>
        </div>
    );
};

export default WelcomeContainer;