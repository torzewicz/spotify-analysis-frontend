import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {fancyTimeFormat} from '../../../utlis/TimeUtils';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import Chip from '@material-ui/core/Chip';
import StarIcon from '@material-ui/icons/Stars';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SlowMotionVideoIcon from '@material-ui/icons/SlowMotionVideo';
import ExplicitIcon from '@material-ui/icons/Explicit';

const TrackComponent = ({track, atMinute, index}) => {

    const {
        name,
        artists,
        uri,
        type,
        popularity,
        id,
        href,
        explicit,
        album,
        preview_url,
        duration_ms,
        external_urls: externalUrls,
        polishTopListRank
    } = track;

    const classes = useStyles();


    const {images} = album;

    const {
        height,
        width,
        url
    } = images[0] || {};


    const {spotify: spotifyUrl} = externalUrls;

    return (
        <Paper elevation={15} className={classes.trackContainer}>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <Paper elevation={15} className={classes.imageContainer}
                       onClick={() => window.open(spotifyUrl)}>
                    {width > height ? (
                        <div style={{
                            borderRadius: 30,
                            overflow: 'hidden',
                            width: 160,
                            height: 160
                        }}>
                            <img src={url}
                                 alt={name}
                                 style={{
                                     height: '100%',
                                 }}
                            /></div>) : (
                        <div style={{
                            borderRadius: 30,
                            overflow: 'hidden',
                            width: 160,
                            height: 160
                        }}>
                            <img src={url}
                                 alt={name}
                                 style={{
                                     height: '100%',
                                 }}
                            /></div>)}
                </Paper>
            </div>

            <div className={classes.infoContainer}>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Typography className={classes.nameText} variant={'h5'}>{name}</Typography>
                    <Tooltip title={'Explicit'} style={{
                        marginLeft: 5,
                        visibility: explicit ? 'visible' : 'hidden'
                    }}><ExplicitIcon fontSize={'large'}/></Tooltip>
                </div>
                <Typography className={classes.descriptionText}
                            variant={'h6'}>{artists.map(i => i.name).join(", ")}</Typography>


                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <div style={{
                        display: 'block',
                    }}>
                        <Tooltip title={`Duration`}>
                            <Chip label={fancyTimeFormat(duration_ms / 1000)} icon={<AccessTimeIcon/>}
                                  variant={'outlined'} style={{
                                padding: 6,
                                fontWeight: 'bold'
                            }}/>
                        </Tooltip>
                    </div>

                    {!!atMinute && <div style={{
                        display: 'block',
                        marginLeft: 20
                    }}>
                        <Tooltip title={`Currently at`}>
                            <Chip label={fancyTimeFormat(atMinute / 1000)} icon={<SlowMotionVideoIcon/>}
                                  variant={'outlined'} style={{
                                padding: 6,
                                fontWeight: 'bold'
                            }}/>
                        </Tooltip>
                    </div>}

                </div>
                <div style={{
                    paddingTop: 5,
                    paddingBottom: 5
                }}>
                    <audio controls={'controls'}>
                        <source src={preview_url} type={'audio/mpeg'}/>
                    </audio>
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                {index && <div>
                    <Tooltip title={`Your track number ${index}`}>
                        <Chip label={`${index}`} icon={<StarIcon/>} variant={'outlined'}/>
                    </Tooltip>
                </div>}

                {!!popularity ? <div>
                    <Tooltip title={`Popularity: ${popularity}`}>
                        <Chip label={`${popularity}`} icon={<WhatshotIcon/>} variant={'outlined'}/>
                    </Tooltip>
                </div> : <Tooltip title={`Popularity: ${0}`}>
                    <Chip label={`${0}`} icon={<WhatshotIcon/>} variant={'outlined'}/>
                </Tooltip>}
            </div>
        </Paper>);
};


const useStyles = makeStyles(theme => ({
    trackContainer: {
        borderRadius: 30,
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        height: 200
    },
    imageContainer: {
        borderRadius: 30,
        cursor: 'pointer',
        maxHeight: 160,

    },
    infoContainer: {
        flex: 4,
        marginLeft: 10,
        padding: 5,
        display: 'flex',
        flexDirection: 'column',
    },
    nameText: {
        fontWeight: 'bold'
    },
    descriptionText: {
        color: theme.palette.text.secondary
    }
}));

export default TrackComponent;