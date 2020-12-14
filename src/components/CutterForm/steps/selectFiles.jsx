import styled from 'styled-components'
import React, { useState } from 'react'
import { formatBytes } from '../../../resources/script/utils.tsx'
import { Button, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Theaters } from '@material-ui/icons/'

const ButtonWrapper = styled.div`
  margin-bottom: 28px;
`;

function SelectFile(): JSX.Element {
  const [ files, setFiles ] = useState([]);

  const addFiles = files => {
    const filesArray = Array.from(files);

    setFiles(filesArray);
  }

  return (
    <>
      <ButtonWrapper>
        <Button variant="contained" color="primary" component="label">
          <input name="files" type="file" onChange={ e => addFiles(e.target.files) } hidden multiple/>
          Choose Videos
        </Button>
      </ButtonWrapper>

      <List>
        {files.map((file, index) => (
          <React.Fragment key={index}>
            <ListItem primary="Spam">
              <ListItemIcon>
                <Theaters/>
              </ListItemIcon>
            
              <ListItemText primary={file.name} secondary={formatBytes(file.size)}/>
            </ListItem>

            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </>
  )
}

export default <SelectFile />