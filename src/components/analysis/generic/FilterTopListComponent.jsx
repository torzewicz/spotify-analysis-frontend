import React from 'react';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

const FilterTopListComponent = ({title, limit, setLimit, timeRange, setTimeRange}) => {
    return (
        <div style={{flexGrow: 1, paddingBottom: 20, paddingTop: 20, alignItems: 'center'}}>
            <Grid container spacing={3}>
                <Grid item sx={12} sm={4} style={{flexGrow: 1}}>
                    <Typography color={'textSecondary'} style={{fontSize: 20}}>
                        {title}
                    </Typography>
                </Grid>

                <Grid item sx={12} sm={4} style={{flexGrow: 1}}>
                    <div style={{flex: 1}}>
                        <InputLabel>Time range</InputLabel>
                        <Select
                            value={timeRange}
                            onChange={event => setTimeRange(event.target.value)}
                            style={{width: '100%', paddingRight: 10}}
                        >
                            <MenuItem value={'short_term'}>Short</MenuItem>
                            <MenuItem value={'medium_term'}>Medium</MenuItem>
                            <MenuItem value={'long_term'}>Long</MenuItem>
                        </Select>
                    </div>
                </Grid>

                <Grid item sx={12} sm={4} style={{flexGrow: 1}}>
                    <div style={{flex: 1}}>
                        <InputLabel>Item limit</InputLabel>
                        <Select
                            value={limit}
                            onChange={event => setLimit(event.target.value)}
                            style={{width: '100%', paddingRight: 10}}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                        </Select>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

FilterTopListComponent.propTypes = {};

export default FilterTopListComponent;
