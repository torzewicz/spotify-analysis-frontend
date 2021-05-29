import React, {useEffect, useState} from 'react';
import ArtistsAnalysisView from './ArtistsAnalysisView';
import axios from 'axios';
import {useSelector} from 'react-redux';

const ArtistsAnalysisContainer = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [artistsData, setArtistsData] = useState(null);

    const [timeRange, setTimeRange] = useState('medium_term');
    const [limit, setLimit] = useState(10);

    const {accessToken} = useSelector(state => state.logIn);

    const fetchArtists = () => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/top/artists`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                timeRange: timeRange.toUpperCase(),
                limit: limit
            }
        })
            .then(({data}) => {
                setArtistsData(data);
            })
            .catch(err => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (accessToken) {
            fetchArtists();
        }
    }, [limit, timeRange, accessToken]);


    return (
        <ArtistsAnalysisView
            loading={loading}
            error={error}
            artistsData={artistsData}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            limit={limit}
            setLimit={setLimit}
        />
    );
};

ArtistsAnalysisContainer.propTypes = {};

export default ArtistsAnalysisContainer;
