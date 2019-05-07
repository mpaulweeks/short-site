import { Database } from 'short-site-utils';
import React from 'react';
import styled from 'styled-components';
import { VideoPreview } from './VideoPreview';

const VideosContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`;

interface Props { }
interface State {
  db?: Database;
};

export class App extends React.Component<Props, State> {
  state: State = {};

  componentDidMount() {
    this.fetchVideos();
  }
  async fetchVideos() {
    const resp = await fetch('http://localhost:8080/db.json');
    const data = await resp.json();
    this.setState({
      db: Database.fromData(data),
    });
  }
  render() {
    const { db } = this.state;
    return (
      <div>
        <h1>short stockpile</h1>
        {db ? (
          <VideosContainer>
            {db.videos.map(v => (
              <VideoPreview key={v.data.url} video={v} />
            ))}
          </VideosContainer>
        ) : (
            'loading...'
          )}
      </div>
    );
  }
}
