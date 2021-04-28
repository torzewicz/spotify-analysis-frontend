import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import LinearProgress from '@material-ui/core/LinearProgress';
import FilterTopListComponent from '../generic/FilterTopListComponent';


const ArtistsAnalysisView = props => {
    const {
        loading,
        error,
        artistsData,
        timeRange,
        setTimeRange,
        limit,
        setLimit,
    } = props;

    const classes = useStyles();

    const ArtistComponent = ({artist}) => {

        const {
            followers,
            genres,
            images,
            name,
            popularity,
            external_urls
        } = artist;

        const {
            height,
            width,
            url
        } = images[0] || {};

        return (
            <Paper className={classes.artistContainer}>

                <Paper elevation={5} className={classes.imageContainer}
                       onClick={() => window.open(external_urls.spotify)}>
                    {width > height ? <img src={url}
                                           alt={name}
                                           style={{
                                               width: 160
                                           }}
                    /> : <img src={url}
                              alt={name}
                              style={{
                                  height: 160
                              }}
                    />}

                </Paper>

                <div className={classes.infoContainer}>

                    <Typography className={classes.nameText} variant={'h5'}>{name}</Typography>
                    <Typography className={classes.descriptionText}>{`Popularity: ${popularity}`}</Typography>
                    <Typography className={classes.descriptionText}>{`Followers: ${followers.total}`}</Typography>
                    <div>
                        {
                            genres.map(genre => <Chip size={'medium'}
                                                      label={genre}
                                                      key={genre}
                                                      variant='outlined'
                                                      style={{marginLeft: 10}}/>)
                        }

                    </div>

                </div>

            </Paper>);
    };


    return (
        <div>
            <FilterTopListComponent
                title={'Your favourite artists'}
                limit={limit}
                setLimit={setLimit}
                timeRange={timeRange}
                setTimeRange={setTimeRange}
            />

            <LinearProgress style={{visibility: loading ? 'visible' : 'hidden'}}/>

            <div>
                {artistsData && artistsData.map(item => <ArtistComponent artist={item} key={item.id}/>)}
            </div>

        </div>
    );
};

ArtistsAnalysisView.propTypes = {};

const useStyles = makeStyles(theme => ({
    artistContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        height: 200,
        padding: 20,
        marginBottom: theme.spacing(1)
    },
    imageContainer: {
        width: 160,
        cursor: 'pointer'
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
