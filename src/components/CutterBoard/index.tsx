import steps from './steps'
import { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { MobileStepper, Paper, Typography, Button } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },

  stepContent: {
    minHeight: 255,
    width: '100%',
    padding: theme.spacing(2),
  },
}));

export default function TextMobileStepper(): JSX.Element {
  const theme = useTheme();
  const classes = useStyles();
  const maxSteps = steps.length;
  const [ activeStep, setActiveStep ] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>{steps[activeStep].label}</Typography>
      </Paper>
      <div className={classes.stepContent}>{steps[activeStep].content}</div>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  );
}