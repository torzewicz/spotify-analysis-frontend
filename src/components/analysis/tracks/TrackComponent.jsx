import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {fancyTimeFormat} from '../../../utlis/TimeUtils';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import Chip from '@material-ui/core/Chip';
import StarIcon from '@material-ui/icons/Stars';
import makeStyles from '@material-ui/core/styles/makeStyles';


const TrackComponent = ({track, atMinute}) => {

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
        <Paper className={classes.trackContainer}>

            <Paper elevation={5} className={classes.imageContainer}
                   onClick={() => window.open(spotifyUrl)}>
                {width > height ? (
                    <img src={url}
                         alt={name}
                         style={{width: 160}}
                    />) : (
                    <img src={url}
                         alt={name}
                         style={{
                             height: 160
                         }}
                    />)}
            </Paper>

            <div className={classes.infoContainer}>

                <Typography className={classes.nameText} variant={'h5'}>{name}</Typography>
                <Typography className={classes.descriptionText}
                            variant={'h6'}>{artists.map(i => i.name).join(", ")}</Typography>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Typography
                        className={classes.descriptionText}>{`Duration: ${fancyTimeFormat(duration_ms / 1000)}`}</Typography>
                    {!!atMinute && <Typography
                        className={classes.descriptionText} style={{
                        marginLeft: 50
                    }}>{`Currently At: ${fancyTimeFormat(atMinute / 1000)}`}</Typography>}
                </div>
                <Typography className={classes.descriptionText} style={{
                    visibility: explicit ? 'visible' : 'hidden'
                }}>{`Explicit`}</Typography>
                <audio controls={'controls'}>
                    <source src={preview_url} type={'audio/mpeg'}/>
                </audio>
            </div>

            {polishTopListRank && <div className={classes.infoContainer}>
                <Tooltip title={`Top ${polishTopListRank} most popular in Poland`}>
                    <Chip label={`Top ${polishTopListRank}`} icon={<StarIcon/>} variant={'outlined'}/>
                </Tooltip>
            </div>}

        </Paper>);
};

const useStyles = makeStyles(theme => ({
    trackContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        height: 200,
        padding: 20,
        marginBottom: theme.spacing(1)
    },
    imageContainer: {
        maxWidth: 160,
        flex: 1,
        cursor: 'pointer'
    },
    infoContainer: {
        flex: 2,
        marginLeft: 20,
        width: '100%',
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