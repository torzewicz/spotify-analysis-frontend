import React from 'react';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import {CircularProgress, Paper, TextField} from "@material-ui/core";

const FilterTopListComponent = ({title, limit, setLimit, timeRange, setTimeRange, loading}) => {
    return (
        <Paper elevation={15}
               style={{
                   flexGrow: 1,
                   paddingBottom: 20,
                   paddingTop: 20,
                   alignItems: 'center',
                   borderRadius: 30,
                   marginTop: 10,
                   marginBottom: 10
               }}>
            <Grid container spacing={3}>
                <Grid item xs={3}
                      style={{
                          flexGrow: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center'
                      }}>
                    <Typography variant={'h4'} color={'textSecondary'}>
                        {title}
                    </Typography>
                </Grid>

                <Grid item xs={3} style={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CircularProgress style={{
                        visibility: loading ? 'visible' : 'hidden'
                    }}/>
                </Grid>

                <Grid item xs={3} style={{flexGrow: 1}}>
                    <div style={{flex: 1}}>
                        <TextField
                            select
                            variant={'outlined'}
                            label={'Time range'}
                            value={timeRange}
                            onChange={event => setTimeRange(event.target.value)}
                            style={{width: '100%', paddingRight: 10}}
                        >
                            <MenuItem value={'short_term'}>Short</MenuItem>
                            <MenuItem value={'medium_term'}>Medium</MenuItem>
                            <MenuItem value={'long_term'}>Long</MenuItem>
                        </TextField>
                    </div>
                </Grid>

                <Grid item xs={3} style={{flexGrow: 1}}>
                    <div style={{flex: 1}}>
                        <TextField
                            select
                            variant={'outlined'}
                            label={'Item limit'}
                            value={limit}
                            onChange={event => setLimit(event.target.value)}
                            style={{width: '100%', paddingRight: 10}}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                        </TextField>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
};

FilterTopListComponent.propTypes = {};

export default FilterTopListComponent;
