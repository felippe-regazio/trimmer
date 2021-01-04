import React from 'react'
import styled from 'styled-components'
import { Language } from '@material-ui/icons/'
import { Menu, MenuItem } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

const LangTogglerRoot = styled.div`
  color: var(--primary-color);

  svg {
    cursor: pointer
  }
`;

export default function LangToggler(): JSX.Element {
  const { t, i18n } = useTranslation();
  const [ anchorEl, setAnchorEl ] = React.useState(null);

  const handleClick = (event: SyntheticEvent): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const setLanguage = (lang: string): Promise => {
    handleClose();
    
    window.localStorage.setItem('trimmerLocale', lang);

    return i18n.changeLanguage(lang);
  };

  return (
    <LangTogglerRoot>
      <Language fontSize="large" aria-controls="lang-toggler" aria-haspopup="true" onClick={handleClick} />
      
      <Menu
        id="lang-toggler"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => setLanguage('en')}>{t('english')}</MenuItem>
        <MenuItem onClick={() => setLanguage('pt-BR')}>{t('portuguese')}</MenuItem>
      </Menu>
    </LangTogglerRoot>
  );
}
