import styled from 'styled-components'
import { Typography } from '@material-ui/core';

const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: 72px;

  h1 {
    font-size: 1.6em;
    margin-bottom: 8px;
    display: inline-block;
    color: var(--primary-color);
    border-bottom: dashed 6px #dddddd;

    @media screen and (max-width: 768px) {
      font-size: 1.1em;
    }
  
    @media screen and (max-width: 425px) {
      font-size: .7em;
      padding-bottom: 16px;
    }
  }

  h2 {
    color: #444444;
    font-size: .25em;
    letter-spacing: 2px;
  }

`;

type LogoProps = {
  subtitle?: string
}

export default function Logo (props: LogoProps): JSX.Element {
  return (
    <Typography variant="h1" component="div" gutterBottom>
      <LogoWrapper>
        <h1>Trimmer</h1>
        <>{props.subtitle && <h2>{props.subtitle}</h2>}</>
      </LogoWrapper>
    </Typography>
  )
}