import { Database } from 'short-site-utils';
import React from 'react';
import styled from 'styled-components';
import { VideoPreview } from './VideoPreview';

const Container = styled.div`
  text-align: center;

  h1 {
    text-decoration: underline;
  }
`;
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
    console.log(process.env);
    const url = process.env.REACT_APP_IS_DEV ? 'http://localhost:8080/db.json' : 'db.json';
    const resp = await fetch(url);
    const data = await resp.json();
    this.setState({
      db: Database.fromData(data),
    });
  }
  render() {
    const { db } = this.state;
    return (
      <Container>
        <h1>short stockpile</h1>
        <div> wip </div>
        {db ? (
          <VideosContainer>
            {db.videos.map(v => (
              <VideoPreview key={v.data.url} video={v} />
            ))}
          </VideosContainer>
        ) : (
            'loading...'
          )}
      </Container>
    );
  }
}
