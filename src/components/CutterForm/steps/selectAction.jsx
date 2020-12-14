import { useState } from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

function SelectAction(): JSX.Element {
  const [action, setAction] = useState('trim');

  const handleChange = event => {
    setAction(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup aria-label="gender" name="gender1" value={action} onChange={handleChange}>
        <FormControlLabel value="trim" control={<Radio />} label="Trim" />
        <FormControlLabel value="slice" control={<Radio />} label="Slice" />
      </RadioGroup>
    </FormControl>
  )
}

export default <SelectAction />