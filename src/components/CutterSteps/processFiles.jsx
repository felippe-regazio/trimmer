import styled from 'styled-components'
import { useContext } from 'react'
import { Context } from '../../context'
import { Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

const Holder = styled.div`
  text-align: center;
  p {
    margin-bottom: 28px;
  }
`;

function ProcessFiles(): JSX.Element {
  const { t } = useTranslation();
  const [ store ] = useContext(Context);
  const { action, startTime, endTime } = store.formData;

  return (
    <Holder>
      <p>
        {action === 'trim' && <>{t('youWill')} <strong>{t('trim')}</strong> {t('yourVideosFrom')} <strong>{startTime}</strong> {t('to')} <strong>{endTime}</strong></>}
        {action === 'slice' && <>{t('youWill')} <strong>{t('slice')}</strong> {t('yourVideosInChunksOf')} <strong>{startTime}</strong></>}
      </p>

      <Button variant="contained" color="primary" type="submit">{t('process')}</Button>
    </Holder>
  )
}

export default <ProcessFiles/>