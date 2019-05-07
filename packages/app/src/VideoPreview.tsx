import React from 'react';
import styled from 'styled-components';
import { Video } from 'short-site-utils';

const Container = styled.a`
  border: 4px solid grey;
  border-radius: 8px;
  width: 400px;
  height: 300px;
  margin: 16px;
  overflow: hidden;

  color: black;
  text-decoration: none;

  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
  flex-wrap: nowrap;
`;

const Title = styled.div`
  margin: 4px;
  font-size: 1.5em;
  font-weight: bold;
`;
const Description = styled.div`
  margin: 4px;
  font-style: italic;
`;
const PreviewContainer = styled.div`
  & img {
    width: 100%;
  }
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
        <Title>
          {video.data.name}
        </Title>
        <Description>
          {this.formatDuration()}
        </Description>
      </Container>
    )
  }
}
