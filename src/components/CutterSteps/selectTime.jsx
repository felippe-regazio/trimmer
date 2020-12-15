import styled from 'styled-components'
import TimePicker from 'react-time-picker'
import { InputLabel } from '@material-ui/core';

const Holder = styled.div`
  width: 100%;
  text-align: center;

  input {
    outline: none;
    margin-top: 8px;
  }
`;

const InputWrapper = styled.div`
  text-align: left;
  margin: 28px 42px;
  margin-top: 16px;
  display: inline-block;
  .react-time-picker__wrapper {
    border: none;
    font-size: 28px;
    select {
      display: none;
    }
  }
`;

function SelectTime(): JSX.Element {
  return (
    <Holder>
      <InputWrapper>
        <InputLabel>Start time:</InputLabel>
        <TimePicker
          maxDetail="second"
          clearIcon={null}
          clockIcon={null}
          disableClock={true}
          hourPlaceholder="00"
          minutePlaceholder="00"
          secondPlaceholder="00"
        />
      </InputWrapper>

      <InputWrapper>
        <InputLabel>End time:</InputLabel>      
        <TimePicker
          maxDetail="second"
          clearIcon={null}
          clockIcon={null}
          disableClock={true}
          hourPlaceholder="00"
          minutePlaceholder="00"
          secondPlaceholder="00"
        />   
      </InputWrapper>
    </Holder>
  )
}

export default <SelectTime/>