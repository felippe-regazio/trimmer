import { Typography, Button } from '@material-ui/core'
import styled from 'styled-components'

const AboutRoot = styled.div`
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

type AboutProps = {
  visible: boolean,
  onClose: unknown,
};

export default function About(props: AboutProps): JSX.Element {
  return (
    <AboutRoot data-visible={props.visible}>
      <AboutHeader>
        <Typography variant='h4' component='p'>
          About 
          
          <Button size="small" onClick={() => props.onClose ? props.onClose() : false} style={{color: 'currentColor'}}>
            Close
          </Button>
        </Typography>
      </AboutHeader>

      <AboutContent>
        <p>
          Trimmer is a simple online video cropper that doesn&apos;t need a backend. 
          It combines a Worker + ffmpeg.js + React to allow your browser to do
          all that hard work without a server.
        </p><br/>

        <ul>
          <li>
            <a href="https://github.com/felippe-regazio/trimmer" target="_blank" rel="noreferrer">Trimmer</a><br/>
            by <a href="https://github.com/felippe-regazio/" target="_blank" rel="noreferrer">Felippe Regazio</a><br/><br/>
          </li>
          <li>
            <a href="https://github.com/felippe-regazio/ffmpeg-client-js" target="_blank" rel="noreferrer">Ffmpeg Worker</a><br/>
              by <a href="https://github.com/felippe-regazio/" target="_blank" rel="noreferrer">Felippe Regazio</a><br/><br/>
            </li>
          <li>
            <a href="https://github.com/Kagami/ffmpeg.js" target="_blank" rel="noreferrer">Ffmpeg.js Port</a><br/>
            by <a href="https://github.com/Kagami" target="_blank" rel="noreferrer">Kagami Hiiragi</a><br/><br/>
          </li>
        </ul>
      </AboutContent>
    </AboutRoot>    
  )
}