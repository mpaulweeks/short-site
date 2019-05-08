import { Database } from 'short-site-utils';
import React from 'react';
import styled from 'styled-components';
import { VideoPreview } from './VideoPreview';
import { Api } from '../api';

const Container = styled.div`
  text-align: center;

  color: #FFFFFF;
  background-color: #333333;
`;
const Title = styled.div`
  padding: 2rem;
  h1 {
    font-size: 3rem;
    margin: 0px;
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
  api: Api;

  constructor(props: Props) {
    super(props);
    this.api = new Api();
  }

  componentDidMount() {
    this.fetchVideos();
  }
  async fetchVideos() {
    console.log(process.env);
    // todo read from utils
    const url = process.env.REACT_APP_IS_DEV ? 'http://localhost:8080/db.json' : 'https://storage.googleapis.com/shortstockpile.com/db.json';
    const resp = await fetch(url);
    const data = await resp.json();
    this.setState({
      db: new Database(data),
    });
  }

  render() {
    const { db } = this.state;
    return (
      <Container>
        <Title>
          <h1>short stockpile</h1>
          <div onClick={() => this.api.ping()}> work in progress by @mpaulweeks </div>
        </Title>
        {db ? (
          <VideosContainer>
            {db.getVideos().map(v => (
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
