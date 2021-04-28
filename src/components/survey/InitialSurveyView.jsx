import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

const InitialSurveyView = props => {

    const [activeStep, setActiveStep] = React.useState(0);

    const classes = useStyles();

    const handleNext = () => {
        setActiveStep(prev => prev + 1);
    };

    const handleBack = () => {
        setActiveStep(prev => prev - 1);
    };

    return (
        <div>


            <Stepper activeStep={activeStep}>

                <Step>
                    <StepLabel>{'Personal data'}</StepLabel>


                </Step>

                <Step>
                    <StepLabel>{'Music taste'}</StepLabel>


                </Step>

                <Step>
                    <StepLabel>{'Hobbies'}</StepLabel>

                </Step>
            </Stepper>

            <div>


            </div>

            <div>
                <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                >
                    Back
                </Button>
                <Button variant='contained' color='primary' onClick={handleNext}>
                    {activeStep === 2 ? 'Finish' : 'Next'}
                </Button>
            </div>

        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

export default InitialSurveyView;
