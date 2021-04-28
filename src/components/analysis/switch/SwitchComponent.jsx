import React, {useState} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ArtistsAnalysisContainer from '../artists/ArtistsAnalysisContainer';
import TracksAnalysisContainer from '../tracks/TracksAnalysisContainer';


const SwitchComponent = (props) => {

    const [currentTab, setCurrentTab] = useState(0);

    return (
        <div>
            <Tabs
            value={currentTab}
            onChange={(e, newValue) => {
                setCurrentTab(newValue)
            }}
            centered>
                <Tab label={'Artists'}></Tab>
                <Tab label={'Tracks'}></Tab>
            </Tabs>
            <div>
                {currentTab === 0 && <ArtistsAnalysisContainer/>}
            </div>
            <div>
                {currentTab === 1 && <TracksAnalysisContainer/>}
            </div>
        </div>
    );
}

export default SwitchComponent;