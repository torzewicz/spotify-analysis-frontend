import React, {useEffect, useState} from 'react';
import TracksAnalysisView from './TracksAnalysisView';
import axios from 'axios';
import {useSelector} from 'react-redux';

const {
    REACT_APP_BACKEND_URL,
} = process.env;

const TracksAnalysisContainer = ({accountName}) => {
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const [tracksData, setTracksData] = useState(null);

        const [timeRange, setTimeRange] = useState('medium_term');
        const [limit, setLimit] = useState(10);

        const {accessToken} = useSelector(state => state.logIn);

        console.log('accountName', accountName)


        useEffect(() => {
                if (accessToken) {
                    if (!!accountName) {
                        setLoading(true);
                        axios.get(`${REACT_APP_BACKEND_URL}/admin/top/tracks/${accountName}`, {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                            params: {
                                timeRange: timeRange.toUpperCase(),
                                limit: limit
                            }
                        })
                            .then(({data}) => {
                                setTracksData(data);
                                setLoading(false);
                            })
                            .catch(err => {
                                setError(err);
                                setLoading(false);
                            });

                    } else {
                        setLoading(true);
                        axios.get(`${REACT_APP_BACKEND_URL}/top/tracks`, {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                            params: {
                                timeRange: timeRange.toUpperCase(),
                                limit: limit
                            }
                        })
                            .then(({data}) => {
                                setTracksData(data);
                                setLoading(false);
                            })
                            .catch(err => {
                                setError(err);
                                setLoading(false);
                            });
                    }
                }

            }, [timeRange, limit, accessToken]
        );


        return (
            <TracksAnalysisView
                accountName={accountName}
                loading={loading}
                error={error}
                tracksData={tracksData}
                timeRange={timeRange}
                limit={limit}
                setLimit={setLimit}
                setTimeRange={setTimeRange}
            />
        );
    }
;

TracksAnalysisContainer.propTypes = {};

export default TracksAnalysisContainer;
