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
  &:hover {
    --foreground: white;
    --background: black;
  }
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
  padding: 0px 1em;
  border-radius: 0px 0px 0.5rem 0.5rem;
  box-sizing: border-box;

  ${FlexColumnMixin}

  color: var(--foreground);
  background-color: var(--background);
`;
const TitleRow = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  flex: 1;

  ${FlexColumnMixin}
`;
const SubtitleRow = styled.div`
  width: 100%;
  height: 3rem;

  ${FlexColumnMixin}
  flex-direction: row;
  justify-content: space-between;
`;
const PublishDate = styled.div`
  font-style: italic;
  text-align: left;

  ${FlexColumnMixin}
`;
const Duration = styled.div`
  font-family: monospace;
  font-weight: bold;
  font-size: 1.5rem;

  ${FlexColumnMixin}
`;

interface Props {
  video: Video;
};

export class VideoPreview extends React.Component<Props> {
  formatPublished() {
    return this.props.video.data.created_at.substring(0, 10);
  }
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
          <SubtitleRow>
            <PublishDate>
              Published on {video.data.host || 'Vimeo'}
              <br />
              {this.formatPublished()}
            </PublishDate>
            <Duration>
              {this.formatDuration()}
            </Duration>
          </SubtitleRow>
        </DetailsContainer>
      </Container>
    )
  }
}
