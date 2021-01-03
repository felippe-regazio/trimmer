import { Container } from '@material-ui/core'
import Logo from '../../components/Logo/'
import Loading from '../../components/Loading'
import CutterForm from '../../components/CutterForm'
import About from '../../components/About'
import { Context } from '../../context'
import { useContext, useState } from 'react'
import { Info } from '@material-ui/icons/'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const AboutWrapper = styled.div`
  position: fixed;
  top: 28px;
  right: 28px;
  cursor: pointer;
  color: var(--primary-color);

  @media screen and (max-width: 375px) {
    top: 16px;
    right: 16px;
  }
`;

export default function Home(): JSX.Element {
  const { t } = useTranslation();
  const [ store ] = useContext(Context);
  const [ showAbout, setShowAbout ] = useState(false);

  const toggleAbout = () => {
    setShowAbout(!showAbout);
  };
    
  return (
    <Container maxWidth="md">
      <Logo subtitle={t('appSubtitle')} />

      {store.loading && <Loading />}
      {!store.loading && store.supported && <CutterForm />}
      
      <AboutWrapper>
        <Info fontSize="large" onClick={() => toggleAbout()}></Info>
        
        <About visible={showAbout} onClose={() => toggleAbout()}/>
      </AboutWrapper>
    </Container>
  )
}
