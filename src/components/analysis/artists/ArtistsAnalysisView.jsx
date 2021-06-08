import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import FilterTopListComponent from '../generic/FilterTopListComponent';
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import StarIcon from "@material-ui/icons/Stars";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import PeopleIcon from '@material-ui/icons/People';
import AlbumIcon from '@material-ui/icons/Album';
import ErrorAlert from "../generic/feedback/alerts/ErrorAlert";


const ArtistsAnalysisView = props => {
    const {
        loading,
        error,
        artistsData,
        timeRange,
        setTimeRange,
        limit,
        setLimit,
        accountName
    } = props;

    const classes = useStyles();

    const ArtistComponent = ({artist, index}) => {

        const {
            followers,
            genres,
            images,
            name,
            popularity,
            external_urls,
        } = artist;

        const {
            height,
            width,
            url
        } = images[0] || {};

        return (
            <Paper elevation={15} className={classes.artistContainer}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <Paper elevation={15} className={classes.imageContainer}
                           onClick={() => window.open(external_urls.spotify)}>
                        {width > height ? <div style={{
                            borderRadius: 30,
                            overflow: 'hidden',
                            width: 160,
                            height: 160
                        }}><img src={url}
                                alt={name}
                                style={{
                                    height: '100%',
                                }}
                        /></div> : <div style={{
                            borderRadius: 30,
                            overflow: 'hidden',
                            width: 160,
                            height: 160
                        }}><img src={url}
                                alt={name}
                                style={{
                                    width: '100%',
                                }}
                        /></div>}

                    </Paper>
                </div>
                <div className={classes.infoContainer}>

                    <Typography className={classes.nameText} variant={'h5'}>{name}</Typography>
                    <div style={{
                        display: 'block',
                    }}>
                        <Tooltip title={`Followers`}>
                            <Chip label={`${followers.total}`} icon={<PeopleIcon/>} variant={'outlined'} style={{
                                padding: 6,
                                fontWeight: 'bold'
                            }}/>
                        </Tooltip>
                    </div>

                    <div style={{
                        marginTop: 6,
                        width: '80%'
                    }}>
                        <Grid container spacing={1}>
                            {genres.slice(0, 6 > genres.length ? genres.length : 6).map(genre => {

                                const newGenre = genre.split(' ').map(i => `${i[0].toUpperCase()}${i.substr(1, i.length - 1)}`).join(' ')

                                return (
                                    <Grid item xs={6} style={{
                                        padding: 0
                                    }} key={genre}>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            padding: 2,
                                        }}>
                                            <AlbumIcon style={{
                                                margin: 2
                                            }}/>
                                            <Typography color={'textSecondary'} style={{
                                                margin: 2,
                                                fontWeight: 'bold'
                                            }}>{newGenre}</Typography>
                                        </div>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </div>

                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    {index && <div>
                        <Tooltip title={`Your artist number ${index}`}>
                            <Chip label={`${index}`} icon={<StarIcon/>} variant={'outlined'}/>
                        </Tooltip>
                    </div>}

                    {popularity && <div>
                        <Tooltip title={`Popularity: ${popularity}`}>
                            <Chip label={`${popularity}`} icon={<WhatshotIcon/>} variant={'outlined'}/>
                        </Tooltip>
                    </div>}

                </div>

            </Paper>);
    };


    return (
        <div>
            <FilterTopListComponent
                title={!!accountName ? `${accountName} favourite artists` : 'Your favourite artists'}
                limit={limit}
                setLimit={setLimit}
                timeRange={timeRange}
                setTimeRange={setTimeRange}
                loading={loading}
            />
            <ErrorAlert error={error}/>

            <div>
                <Grid container spacing={2}>
                    {artistsData && artistsData.map((item, index) => <Grid item xs={6} key={index}> <ArtistComponent artist={item}
                                                                                                         key={item.id}
                                                                                                         index={index + 1}/>
                    </Grid>)}
                </Grid>
            </div>

        </div>
    );
};

ArtistsAnalysisView.propTypes = {};

const useStyles = makeStyles(theme => ({
    artistContainer: {
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

export default ArtistsAnalysisView;
