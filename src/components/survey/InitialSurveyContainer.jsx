import React, {useState} from 'react';
import InitialSurveyView from './InitialSurveyView';

const InitialSurveyContainer = () => {

    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');

    return (
        <InitialSurveyView/>
    );
};

export default InitialSurveyContainer;
