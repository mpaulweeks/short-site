import { VideoQuery, Database } from 'short-site-utils';
import React, { ChangeEvent } from 'react';
import { Cookies } from 'react-cookie';
import styled from 'styled-components';
import { VideoPreview } from './VideoPreview';
import { Api } from '../api';
import { User } from '../user';

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

interface Props {
  cookies: Cookies;
  api: Api;
  db?: Database;
  user?: User;
}
interface State {
  sortOptionKey: string;
};

export class VideoGallery extends React.Component<Props, State> {
  state: State = {
    sortOptionKey: 'pubNew',
  };
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

  onChangeSort(event: ChangeEvent<HTMLSelectElement>) {
    this.setState({
      sortOptionKey: event.target.value,
    });
  }
  render() {
    const { api, db, user } = this.props;
    const { sortOptionKey } = this.state;
    const videos = db && db.getVideos({
      ...this.sortOptions[sortOptionKey] || {},
    });
    return (
      <div>
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
              <VideoPreview
                key={v.data.id}
                api={api}
                user={user}
                video={v}
              />
            ))}
          </VideosContainer>
        ) : (
            'loading...'
          )}
      </div>
    );
  }
}
