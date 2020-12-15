import { useState } from 'react'
import styled from 'styled-components'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

const Centered = styled.div`
  width: 100%;
  text-align: center;
`;

function SelectAction(): JSX.Element {
  const [action, setAction] = useState('trim');

  const handleChange = event => {
    setAction(event.target.value);
  };

  return (
    <Centered>
      <FormControl component="fieldset">
        <RadioGroup aria-label="gender" name="action" value={action} onChange={handleChange}>
          <FormControlLabel value="trim" control={<Radio />} label="Trim" />
          <FormControlLabel value="slice" control={<Radio />} label="Slice" />
        </RadioGroup>
      </FormControl>
    </Centered>
  )
}

export default <SelectAction />