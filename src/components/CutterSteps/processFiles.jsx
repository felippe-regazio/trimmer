import styled from 'styled-components'
import { useContext } from 'react'
import { Context } from '../../context'
import { Button } from '@material-ui/core'

const Holder = styled.div`
  text-align: center;
  p {
    margin-bottom: 28px;
  }
`;

function ProcessFiles(): JSX.Element {
  const [ store ] = useContext(Context);
  const { action, startTime, endTime } = store.formData;

  return (
    <Holder>
      <p>
        {action === 'trim' && <>You will <strong>trim</strong> your vídeos from <strong>{startTime}</strong> to <strong>{endTime}</strong></>}
        {action === 'slice' && <>You will <strong>split</strong> your vídeos in chunks of <strong>{startTime}</strong></>}
      </p>

      <Button variant="contained" color="primary" type="submit">Process</Button>
    </Holder>
  )
}

export default <ProcessFiles/>