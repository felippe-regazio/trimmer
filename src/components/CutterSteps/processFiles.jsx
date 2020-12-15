import styled from 'styled-components'
import { Button } from '@material-ui/core'

const Holder = styled.div`
  text-align: center;
  p {
    margin-bottom: 28px;
  }
`;

function ProcessFiles(): JSX.Element {
  return (
    <Holder>
      <p>You will trim your vídeos from 00:00:00 to 00:00:00</p>

      <Button variant="contained" color="primary" type="submit">Process</Button>
    </Holder>
  )
}

export default <ProcessFiles/>