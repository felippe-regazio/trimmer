import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { download } from '../../resources/script/utils.tsx'
import { Typography, Button, Card, CardActions } from '@material-ui/core';

type VideoCardProps = {
  url: unknown,
  name: string,
  index: number,
}

const VideoWrapper = styled.div`
  width: 100%;

  video {
    width: 100%;
  }
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  p.MuiTypography-root {
    overflow: hidden;
    margin-right: 16px;
    text-overflow: ellipsis;
  }
`;

export default function VideoCard(props: VideoCardProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <Card>
      <VideoWrapper>
        <video src={props.url} controls></video>
      </VideoWrapper>
      
      <CardActions>
        <Actions>
          <Typography>
            {`${props.index + 1}_${props.name}`}
          </Typography>

          <Button size="small" color="primary" onClick={() => download(`${props.index + 1}_${props.name}`, props.url)}>
            {t('download')}
          </Button>
        </Actions>
      </CardActions>
    </Card>
  )
}