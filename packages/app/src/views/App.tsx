import { VideoQuery, Database } from 'short-site-utils';
import React, { ChangeEvent } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import styled from 'styled-components';
import { VideoPreview } from './VideoPreview';
import { FlexColumnMixin } from './common';
import { Api } from '../api';
import { checkForLoginToken } from '../query';
import { User } from '../user';

const Container = styled.div`
  text-align: center;

  color: #FFFFFF;
  background-color: #333333;
`;
const TopBar = styled.div`
  ${FlexColumnMixin}
  flex-direction: row;
  justify-content: space-between;

  & > div {
    margin: 1rem;
    margin-bottom: 0rem;
  }
`;
const Debug = styled.div`
  text-align: left;
`;
const Account = styled.div`
  text-align: right;
`;
const AccountName = styled.div`
  font-style: italic;
`;
const Clickable = styled.div`
  cursor: pointer;
  text-decoration: underline;
`;

const Title = styled.div`
  padding: 2rem;
  padding-top: 0rem;
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

interface Props {
  cookies: Cookies;
}
interface State {
  db?: Database;
  sortOptionKey: string;
  user?: User;
};

class _App extends React.Component<Props, State> {
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
    this.api = new Api(props.cookies);
  }

  componentDidMount() {
    const { cookies } = this.props;
    const token = checkForLoginToken();
    if (token) {
      cookies.set('token', token);
    }
    const loggedIn = !!cookies.get('token');
    if (loggedIn) {
      this.fetchUserInfo();
    }
    this.fetchVideos();
  }
  async fetchUserInfo() {
    const userInfo = await this.api.whoami();
    this.setState({
      user: {
        email: userInfo.email,
      },
    });
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
  logout() {
    const { cookies } = this.props;
    cookies.remove('token');
    window.location.reload();
  }
  testLogin() {
    window.location.href = `
      http://localhost:3000?token=VTJGc2RHVmtYMTlhWjNuQldxZk9PbEpOeGVaZDlra3BqalM4cUFmSE03RXhpMCtRZHRYbkhxWmh6OUxySk9HVw==
    `;
  }

  onChangeSort(event: ChangeEvent<HTMLSelectElement>) {
    this.setState({
      sortOptionKey: event.target.value,
    });
  }
  render() {
    const { db, sortOptionKey, user } = this.state;
    const videos = db && db.getVideos({
      ...this.sortOptions[sortOptionKey] || {},
    });
    return (
      <Container>
        <TopBar>
          <Debug>
            {process.env.REACT_APP_IS_DEV && (
              <Clickable onClick={() => this.testLogin()}>
                test login
              </Clickable>
            )}
          </Debug>
          <Account>
            {user && (
              <div>
                <AccountName>
                  {user.email}
                </AccountName>
                <Clickable onClick={() => this.logout()}>
                  log out
                </Clickable>
              </div>
            )}
          </Account>
        </TopBar>
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

export const App = withCookies(_App);
