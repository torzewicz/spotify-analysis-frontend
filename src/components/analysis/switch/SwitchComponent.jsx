import React, {useState} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ArtistsAnalysisContainer from '../artists/ArtistsAnalysisContainer';
import TracksAnalysisContainer from '../tracks/TracksAnalysisContainer';
import {useParams} from "react-router";


const SwitchComponent = (props) => {

    const [currentTab, setCurrentTab] = useState(0);
    const {accountName} = useParams();
    return (
        <div>
            <Tabs
            value={currentTab}
            onChange={(e, newValue) => {
                setCurrentTab(newValue)
            }}
            centered>
                <Tab label={'Artists'}/>
                <Tab label={'Tracks'}/>
            </Tabs>
            <div>
                {currentTab === 0 && <ArtistsAnalysisContainer accountName={accountName}/>}
            </div>
            <div>
                {currentTab === 1 && <TracksAnalysisContainer accountName={accountName}/>}
            </div>
        </div>
    );
}

export default SwitchComponent;