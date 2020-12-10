import { Container } from '@material-ui/core'
import Logo from '../../components/Logo/'
import Loading from '../../components/Loading'

export default function Home(): JSX.Element {
  const loading = true;
  
  return (
    <Container maxWidth="md">
      <Logo subtitle="Quickly cut vídeos directly on your browser" />

      {loading ? <Loading /> : <br />}
    </Container>
  )
}
