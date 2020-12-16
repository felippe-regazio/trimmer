import steps from '../CutterSteps/'
import styled from 'styled-components'
import serialize from 'form-serialize'
import { Context } from '../../context'
import { useState, useContext } from 'react'
import { useTheme } from '@material-ui/core/styles'
import { useToasts } from 'react-toast-notifications'
import { MobileStepper, Button } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import { buildSubmitData, validateSubmitData, processFile } from '../../resources/script/utils'

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

  const isPageLoading = state => {
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

    const results = [];
    const data = buildSubmitData(store.formData);
    const validation = validateSubmitData(data);

    if (!validation.valid) {
      showValidationErrors(validation.errors);
    } else {
      processData(data);
    }
  };

  const showValidationErrors = errors => {
    errors.forEach(error => {
      try {
        addToast(error, { 
          autoDismiss: true,
          appearance: 'error'
        });
      } catch {}
    });
  };

  const processData = async data => {
    const results = [];

    isPageLoading(true);

    addToast('Processing videos', { 
      autoDismiss: true,
      appearance: 'success'
    });

    /**
     * Is possible to send all fices at once to ffmpeg worker, or
     * process all them using a single async function, but considering 
     * that the split (chunk) option can consume a lot of memory, we 
     * will send one file at once in a Sync FIFO to avoid problems 
     * with memory and heaps, so you can send as many files as you want.
     */
    
    for (const file of data.files) {
      await processFile({
        file,
        data,
        processors: store.processors,
      })
        .then(data => {
          addToast(`File processed: "${data.result[0].name}"`, { 
            autoDismiss: true,
            appearance: 'success'
          });

          results.push(data.result);
        })
        .catch(error => {
          handleProccessError({ reference: error, file });
        });
    }

    allFilesProcessed(results);
    isPageLoading(false);
  };

  const handleProccessError = error => {
    console.error(error.reference);

    addToast(`Sorry, but an error has occurred while processing "${error.file.name}"`, { 
      autoDismiss: false,
      appearance: 'error'
    });
  };

  const allFilesProcessed = data => {
    console.log(data);
    // const dynamicUrlList = {};
    
    // data.result.forEach(item => {
    //   const urlList = item.blobs.map(blob => window.URL.createObjectURL(blob));

    //   dynamicUrlList[item.name] = urlList;
    // });
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