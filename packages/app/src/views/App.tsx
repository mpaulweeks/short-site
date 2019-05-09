import { VideoQuery, Database } from 'short-site-utils';
import React, { ChangeEvent } from 'react';
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
const Options = styled.div`
  & > * {
    margin: 0px 0.5rem;
  }
`;
const VideosContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`;

interface QueryOptions {
  [key: string]: VideoQuery;
};

interface Props { }
interface State {
  db?: Database;
  sortOptionKey: string;
};

export class App extends React.Component<Props, State> {
  state: State = {
    sortOptionKey: 'pubNew',
  };
  api: Api;
  sortOptions: QueryOptions = {
    alpha: {
      sortCallback: v => v.data.name,
      reverse: false,
    },
    lenShort: {
      sortCallback: v => v.data.duration,
      reverse: false,
    },
    lenLong: {
      sortCallback: v => v.data.duration,
      reverse: true,
    },
    pubNew: {
      sortCallback: v => v.data.published_at,
      reverse: true,
    },
    pubOld: {
      sortCallback: v => v.data.published_at,
      reverse: false,
    },
  };

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

  onChangeSort(event: ChangeEvent<HTMLSelectElement>) {
    this.setState({
      sortOptionKey: event.target.value,
    });
  }
  render() {
    const { db, sortOptionKey } = this.state;
    const videos = db && db.getVideos({
      ...this.sortOptions[sortOptionKey] || {},
    });
    return (
      <Container>
        <Title>
          <h1>short stockpile</h1>
          <div onClick={() => this.api.ping()}> work in progress by @mpaulweeks </div>
        </Title>
        <Options>
          <span>
            Sort by:
          </span>
          <select onChange={evt => this.onChangeSort(evt)}>
            <option value='pubNew'>Published date, Newest</option>
            <option value='pubOld'>Published date, Oldest</option>
            <option value='alpha'>Alphabetic</option>
            <option value='lenShort'>Duration, Shortest</option>
            <option value='lenLong'>Duration, Longest</option>
          </select>
        </Options>
        {videos ? (
          <VideosContainer>
            {videos.map(v => (
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
