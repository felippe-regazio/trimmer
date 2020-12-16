import styled from 'styled-components'
import InputMask from 'react-input-mask'
import { Context } from '../../context'
import { useContext } from 'react'
import { InputLabel, Input } from '@material-ui/core'

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

type InputTimeProps = {
  name: string,
  label: string
}

function InputTime(props: InputTimeProps): JSX.Element {
  return (
    <InputWrapper>
      <InputLabel>{props.label}</InputLabel>

      <InputMask mask='99:99:99' maskChar='0' alwaysShowMask={true}>
        {() => <Input name={props.name} />}
      </InputMask>
    </InputWrapper>
  )
}

function SelectTime(): JSX.Element {
  const [ store ] = useContext(Context);
  const willTrim = store.formData && store.formData.action === 'trim';

  return (
    <Holder>
      <InputTime name='startTime' label={willTrim ? 'Start time:' : 'Chunk size:'} />
      
      {willTrim && <InputTime name='endTime' label='End time:' />}
    </Holder>
  )
}

export default <SelectTime/>