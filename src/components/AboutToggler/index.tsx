import styled from 'styled-components'
import { useState } from 'react'
import { Info } from '@material-ui/icons/'
import { Typography, Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

const AboutRoot = styled.div`
  color: var(--primary-color);

  svg {
    cursor: pointer;
  }
`;

const AboutAside = styled.div`
  position: fixed;
  background-color: var(--primary-color);
  width: 100%;
  cursor: initial;
  max-width: 425px;
  right: 0;
  top: 0;
  height: 100vh;
  color: #ffffff;
  transition: 200ms;

  &[data-visible=false] {
    right: -100%;
    transition: 200ms;
  }
  
  a {
    font-weight: 700;
    color: currentColor;
  }
  `;
  
const AboutHeader = styled.div`
  padding: 16px;
  border-bottom: solid 1px currentColor;
  p {
    display: flex;
    justify-content: space-between;
  }
`;

const AboutContent = styled.div`
  padding: 16px;
`;

export default function AboutToggler(): JSX.Element {
  const { t } = useTranslation();
  const [ showAbout, setShowAbout ] = useState(false);

  const toggleAbout = () => {
    setShowAbout(!showAbout);
  };

  return (
    <AboutRoot>
      <Info fontSize="large" onClick={() => toggleAbout()} />
      
      <AboutAside data-visible={showAbout}>
        <AboutHeader>
          <Typography variant='h4' component='p'>
            {t('about')} 
            
            <Button size="small" onClick={() => toggleAbout()} style={{color: 'currentColor'}}>
              {t('close')}
            </Button>
          </Typography>
        </AboutHeader>

        <AboutContent>
          <p>{t('appAbout')}</p><br/>

          <ul>
            <li>
              <a href="https://github.com/felippe-regazio/trimmer" target="_blank" rel="noreferrer">Trimmer</a><br/>
              {t('by')} <a href="https://github.com/felippe-regazio/" target="_blank" rel="noreferrer">Felippe Regazio</a><br/><br/>
            </li>
            <li>
              <a href="https://github.com/felippe-regazio/ffmpeg-client-js" target="_blank" rel="noreferrer">Ffmpeg Worker</a><br/>
                {t('by')} <a href="https://github.com/felippe-regazio/" target="_blank" rel="noreferrer">Felippe Regazio</a><br/><br/>
              </li>
            <li>
              <a href="https://github.com/Kagami/ffmpeg.js" target="_blank" rel="noreferrer">Ffmpeg.js Port</a><br/>
              {t('by')} <a href="https://github.com/Kagami" target="_blank" rel="noreferrer">Kagami Hiiragi</a><br/><br/>
            </li>
          </ul>
        </AboutContent>
      </AboutAside>
    </AboutRoot>
  )
}