import styled from 'styled-components'
import InputMask from 'react-input-mask'
import { TextField } from '@material-ui/core';

const InputWrapper = styled.div`
  margin: 14px 0;
`;

function SelectTime(): JSX.Element {
  return (
    <>
      <InputWrapper>
        <InputMask mask="99:99:99" maskChar="0" alwaysShowMask={true}>
          {() => <TextField label="Start Time"/>}
        </InputMask>
      </InputWrapper>

      <InputWrapper>
        <InputMask mask="99:99:99" maskChar="0" alwaysShowMask={true}>
          {() => <TextField label="End Time"/>}
        </InputMask>      
      </InputWrapper>
    </>
  )
}

export default <SelectTime/>