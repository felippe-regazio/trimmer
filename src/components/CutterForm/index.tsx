import steps from './steps'
import styled from 'styled-components'
import { useState } from 'react'
import { useTheme } from '@material-ui/core/styles'
import { MobileStepper, Button } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'

const WrapperDiv = styled.div`
flex-grow: 1;
`;

const ContentDiv = styled.div`
  width: '100%';
  text-align: center;
  padding: theme.spacing(2);
`;

const FootDiv = styled.div`
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 16px;
  position: fixed;
  border-top: solid 1px #cccccc;
  display: flex;
  align-items: center;
  > div {
    width: 100%;
    margin: 0 auto;
    max-width: 960px;
  }
`;

export default function TextMobileStepper(): JSX.Element {
  const theme = useTheme();
  const maxSteps = steps.length;
  const [ activeStep, setActiveStep ] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <WrapperDiv>
      {steps.map((step, index) => (
        <ContentDiv hidden={index !== activeStep} key={index}>
          { step }
        </ContentDiv>
      ))}

      <FootDiv>
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
      </FootDiv>
    </WrapperDiv>
  );
}