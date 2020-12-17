import styled from 'styled-components'
import { useContext, useState } from 'react'
import { Context } from '../../context'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VideoCard from '../VideoCard'
import { download } from '../../resources/script/utils.tsx'
import { Button, Chip, Avatar, Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core'

const Wrapper = styled.div`
  top: 0;
  left: 50%;
  width: 100%;
  height: 100vh;
  overflow: auto;
  position: fixed;
  max-width: 960px;
  background-color: #eeeeee;
  transform: translateX(-50%);

  .MuiChip-label {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 236px;
  }
`;

const Toolbar = styled.div`
  background-color: #fafafa;
  position: static;
  position: sticky;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
`;

const ToolBarInner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 960px) {
    padding: 0 16px;
  }    
`;

const ActionRow = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    display: block;
  }
`; 

const Results = styled.div`
  padding: 16px;
`;

const CardsHolder = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(3, 1fr);

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 425px) {
    grid-template-columns: 1fr;
  }  
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  
  > div {
    margin: 0 8px;    
  }

  @media screen and (max-width: 768px) {
    display: block;
    > div {
      display: flex;
      justify-content: space-between;
    }  
  }  
`;

export default function ShowResults(): JSX.Element {
  const [ store, dispatch ] = useContext(Context);
  const videos = store.processed;
  const [ expanded, setExpanded ] = useState(videos[0]?.name);

  const handlePanelExpansion = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const close = () => {
    dispatch({ type: 'updateStore', payload: { processed: [] } });
  };

  const downloadAll = (name, blobs) => {
    blobs.forEach((b, i) => download(`${i + 1}_${name}`, b));
  };

  return (
    <Wrapper>
      <Toolbar>
        <ToolBarInner>
          <h1>{store.formData.action === 'trim' ? 'Trim Results' : 'Slice Results'}</h1>
          <Button color='inherit' onClick={() => close()}>Close</Button>
        </ToolBarInner>
      </Toolbar>

      <Results>
        {videos.map((item, index) => {
          return (
            <Accordion key={index} square expanded={expanded === item.name} onChange={handlePanelExpansion(item.name)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h6'>
                  <Chip color='primary' label={item.name} avatar={<Avatar>{item.blobs.length}</Avatar>}></Chip>
                </Typography>
              </AccordionSummary>

              <ActionRow>
                <div>
                  <Stats>
                    <div><strong>Command:</strong> {store.formData.action}</div>
                    <div><strong>Chunk size:</strong> {store.formData.startTime}</div>
                    <div><strong>Files generated:</strong> {item.blobs.length}</div>
                  </Stats>
                </div>

                <Button onClick={() => downloadAll(item.name, item.blobs)}>Download All</Button>
              </ActionRow>

              <AccordionDetails>  
                <CardsHolder>
                  {item.blobs.map((videoUrl, index) => {
                    return (
                      <VideoCard key={index} url={videoUrl} name={item.name} index={index}/>
                    )
                  })}
                </CardsHolder>
              </AccordionDetails>
            </Accordion>
          )
        })}
      </Results>
    </Wrapper>
  )
}