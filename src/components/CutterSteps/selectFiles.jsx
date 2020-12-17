import styled from 'styled-components'
import React, { useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import { Theaters } from '@material-ui/icons/'
import { useToasts } from 'react-toast-notifications'
import { formatBytes } from '../../resources/script/utils.tsx'
import { Button, Typography, Divider, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core'

const ButtonWrapper = styled.div`
  text-align: center;
  margin-bottom: 28px;
`;

const ListWrapper = styled.div`
  padding-bottom: 56px;
`;

function SelectFile(): JSX.Element {
  const maxFileSize = 314572800;
  const { addToast } = useToasts();
  const [ files, setFiles ] = useState([]);

  const warnFileSize = () => {
    addToast(`You added some files bigger than ${formatBytes(maxFileSize)}. 
    Avoid process big files concurrent to others, add them in a single process task instead. 
    Since your browser will be processing it all by itself without the help of a server, 
    also avoid process files bigger than 500 MB or you can run out of memory`, { 
      autoDismiss: false,
      appearance: 'warning'
    });    
  };

  const addFiles = files => {
    const filesArray = Array.from(files);
    const mustWarnFileSize = filesArray.some(file => file.size > maxFileSize);

    mustWarnFileSize && warnFileSize();

    setFiles(filesArray);
  };

  const deleteItem = index => {
    const newArr = [ ...files ]
    newArr.splice(index, 1);

    setFiles(newArr);
  };

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
              
                <ListItemText 
                  color='primary'
                  primary={file.name} 
                  secondary={
                    <Typography style={{ color: file.size > maxFileSize ? '#ffab00' : '#aaaaaa' }}>
                      {formatBytes(file.size)}
                    </Typography>
                  }/>

                <ListItemSecondaryAction onClick={() => deleteItem(index)}>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>              
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