import steps from '../CutterSteps/'
import styled from 'styled-components'
import serialize from 'form-serialize'
import ShowResults from '../ShowResults'
import { Context } from '../../context'
import { useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@material-ui/core/styles'
import { useToasts } from 'react-toast-notifications'
import { MobileStepper, Button } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import { buildSubmitData, validateSubmitData, processFile, truncate } from '../../resources/script/utils'

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
  const theme = useTheme();
  const { t } = useTranslation();
  const { addToast } = useToasts();
  const [ activeStep, setActiveStep ] = useState(0);
  const [ store, dispatch ] = useContext(Context);

  const maxSteps = steps.length;
  const form = document.forms.cutterform;

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

    if (activeStep !== maxSteps - 1) {
      return handleNext();
    }

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
        addToast(t(error), { 
          autoDismiss: true,
          appearance: 'error'
        });
      } catch {}
    });
  };

  const processData = async data => {
    const processed = [];

    isPageLoading(true);

    addToast(t('processingVideos'), { 
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
    
    for (const [ index, file ] of data.files.entries()) {
      await processFile({
        file,
        data,
        processors: store.processors,
      })
        .then(proc => {
          const filesProcessedStr = `${t('fileProcessed')}: "${truncate(20, proc.result[0].name)}".`;
          const filesRemainingStr = `${t('filesRemaining')}: ${data.files.length - (index + 1)}`;

          addToast(`${filesProcessedStr} ${filesRemainingStr}`, { 
            autoDismiss: true,
            appearance: 'success'
          });

          processed.push(proc.result);
        })
        .catch(error => {
          handleProcessError({ reference: error, file });
        });
    }

    allFilesProcessed(processed);
    isPageLoading(false);
  };

  const handleProcessError = error => {
    console.error(error.reference);

    addToast(`${t('errorWhileProcessing')} "${error.file.name}"`, { 
      autoDismiss: false,
      appearance: 'error'
    });
  };

  const allFilesProcessed = data => {
    const dynamicUrlList = data
      .map(item => ({ name: item[0].name, blobs: item[0].blobs }))
      .map(item => {
        item.blobs = item.blobs.map(b => window.URL.createObjectURL(b));

        return item;
      });

    dispatch({ type: 'updateStore', payload: { processed: dynamicUrlList } });
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
              {t('next')}
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
              {t('back')}
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

      {store.processed.length > 0 && <ShowResults/>}
    </WrapperDiv>
  );
}