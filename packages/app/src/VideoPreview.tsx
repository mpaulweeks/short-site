import React from 'react';
import styled from 'styled-components';
import { Video } from 'short-site-utils';
import { FlexColumnMixin } from './common';

const Container = styled.a`
  border-radius: 0.5rem 0.5rem 0px 0px;
  width: 400px;
  height: 350px;
  margin: 16px;
  overflow: hidden;
  text-decoration: none;

  ${FlexColumnMixin}

  --foreground: black;
  --background: white;
`;

const PreviewContainer = styled.div`
  width: 100%;
  flex: 1;

  ${FlexColumnMixin}

  & img {
    height: 100%;
    min-width: 100%;
  }
`;
const DetailsContainer = styled.div`
  height: 8rem;
  width: 100%;
  border-radius: 0px 0px 0.5rem 0.5rem;
  border: 1px solid black;
  border-top-width: 0px;
  box-sizing: border-box;

  ${FlexColumnMixin}

  color: var(--foreground);
  background-color: var(--background);

  &:hover {
    color: var(--background);
    background-color: var(--foreground);
  }
`;
const TitleRow = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  flex: 1;

  ${FlexColumnMixin}
`;
const Duration = styled.div`
  height: 3rem;

  ${FlexColumnMixin}
`;

interface Props {
  video: Video;
};

export class VideoPreview extends React.Component<Props> {
  formatDuration() {
    const { duration } = this.props.video.data;
    const minutes = Math.floor(duration / 60).toString();
    const seconds = (duration % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }
  render() {
    const { video } = this.props;
    return (
      <Container href={video.data.url}>
        <PreviewContainer>
          <img src={video.data.imgUrl} />
        </PreviewContainer>
        <DetailsContainer>
          <TitleRow>
            {video.data.name}
          </TitleRow>
          <Duration>
            {this.formatDuration()}
          </Duration>
        </DetailsContainer>
      </Container>
    )
  }
}
