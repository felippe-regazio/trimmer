import steps from '../CutterSteps/'
import styled from 'styled-components'
import serialize from 'form-serialize'
import { Context } from '../../context'
import { useState, useContext } from 'react'
import { useTheme } from '@material-ui/core/styles'
import { useToasts } from 'react-toast-notifications'
import { MobileStepper, Button } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import { buildSubmitData, validateSubmitData, processData } from '../../resources/script/utils'

const WrapperDiv = styled.div`
  flex-grow: 1;
`;

const ContentDiv = styled.div`
  width: '100%';
  padding: theme.spacing(2);
`;

const Controls = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  margin-bottom: 48px;
  align-items: center;
  border-bottom: solid 1px rgba(0, 0, 0, 0.12);
  border-top: solid 1px rgba(0, 0, 0, 0.12);
  > div {
    width: 100%;
    margin: 0 auto;
    max-width: 960px;
  }
`;

export default function TextMobileStepper(): JSX.Element {
  const form = document.forms.cutterform;
  const theme = useTheme();
  const maxSteps = steps.length;
  const { addToast } = useToasts()
  const [ activeStep, setActiveStep ] = useState(0);
  const [ store, dispatch ] = useContext(Context);

  const isPageLoading = (state = true) => {
    dispatch({ type: 'updateStore', payload: { loading: state } });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    dispatch({
      type: 'updateStore',
      payload: {
        formData: {
          files: Array.from(form ? form.querySelector('input[type=file]').files: []),
          ...serialize(form, { hash: true, empty: true })
        }
      }
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const data = buildSubmitData(store.formData);
    const validation = validateSubmitData(data);

    if (validation.valid) {
      addToast('Processing videos', { 
        autoDismiss: true,
        appearance: 'success'
      });      

      processData(data, store.processors, {
        busy: () => isPageLoading(true),
        done: result => {
          console.log(result);
          
          isPageLoading(false);
        },
        error: console.log,
      });
    } else {
      validation.errors.forEach(error => {
        try {
          addToast(error, { 
            autoDismiss: true,
            appearance: 'error'
          });
        } catch {}
      });
    }
  };

  return (
    <WrapperDiv>
      <Controls>
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
      </Controls>
      
      <form id="cutterform" action="/" onSubmit={handleSubmit}>
        {steps.map((step, index) => (
          <ContentDiv hidden={index !== activeStep} key={index}>
            { step }
          </ContentDiv>
        ))}
      </form>
    </WrapperDiv>
  );
}