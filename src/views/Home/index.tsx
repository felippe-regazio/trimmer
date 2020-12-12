import { Container } from '@material-ui/core'
import Logo from '../../components/Logo/'
import Loading from '../../components/Loading'
import { Context } from '../../context'
import { useContext } from 'react'

export default function Home(): JSX.Element {
  const [ store ] = useContext(Context);
    
  return (
    <Container maxWidth="md">
      <Logo subtitle="Quickly cut vídeos directly on your browser" />

      {!store.ffmpegLoaded ? <Loading /> : <br />}
    </Container>
  )
}
