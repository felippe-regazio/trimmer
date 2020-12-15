import styled from 'styled-components'
import React, { useState } from 'react'
import { Theaters } from '@material-ui/icons/'
import { formatBytes } from '../../resources/script/utils.tsx'
import { Button, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

const ButtonWrapper = styled.div`
  text-align: center;
  margin-bottom: 28px;
`;

const ListWrapper = styled.div`
  padding-bottom: 56px;
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
          <input name="files" type="file" accept="video/*" onChange={ e => addFiles(e.target.files) } hidden multiple/>
          Choose Videos
        </Button>
      </ButtonWrapper>

      <ListWrapper>
        <List>
          {files.map((file, index) => (
            <React.Fragment key={index}>
              <ListItem primary="Spam">
                <ListItemIcon>
                  <Theaters/>
                </ListItemIcon>
              
                <ListItemText primary={file.name} secondary={formatBytes(file.size)}/>
              </ListItem>

              {index !== files.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </ListWrapper>
    </>
  )
}

export default <SelectFile />