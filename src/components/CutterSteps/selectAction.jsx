import { useState } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation();
  const [action, setAction] = useState('trim');

  const handleChange = (event: SyntheticEvennt): void => {
    setAction(event.target.value);
  };

  const ucFirst = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <Centered>
      <FormControl component="fieldset">
        <RadioGroup name="action" value={action} onChange={handleChange}>
          <FormControlLabel value='trim' control={<Radio />} label={ucFirst(t('trim'))} />
          <FormControlLabel value='slice' control={<Radio />} label={ucFirst(t('slice'))} />
        </RadioGroup>
      </FormControl>
    </Centered>
  )
}

export default <SelectAction />