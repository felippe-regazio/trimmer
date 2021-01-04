import { Container } from '@material-ui/core'
import Logo from '../../components/Logo/'
import Loading from '../../components/Loading'
import CutterForm from '../../components/CutterForm'
import { Context } from '../../context'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

export default function Home(): JSX.Element {
  const { t } = useTranslation();
  const [ store ] = useContext(Context);

  return (
    <Container maxWidth="md">
      <Logo subtitle={t('appSubtitle')} />

      {store.loading && <Loading />}
      {!store.loading && store.supported && <CutterForm />}
    </Container>
  )
}
