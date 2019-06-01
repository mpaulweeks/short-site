import { Database } from 'short-site-utils';
import React from 'react';
import { withCookies, Cookies } from 'react-cookie';
import styled from 'styled-components';
import { FlexColumnMixin } from './common';
import { VideoGallery } from './VideoGallery';
import { Login } from './Login';
import { Api } from '../api';
import { checkForLoginToken } from '../query';
import { User } from '../user';

const Views = {
  Login: 'login',
  Gallery: 'gallery',
};

const Container = styled.div`
  text-align: center;

  color: #FFFFFF;
  background-color: #333333;

  min-height: 100vh;
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

interface Props {
  cookies: Cookies;
}
interface State {
  view: string;
  db?: Database;
  user?: User;
};

class _App extends React.Component<Props, State> {
  state: State = {
    view: Views.Gallery,
  };
  api: Api;

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
        favorites: ['65eaf3fd-2af7-4114-8e74-f09124f4716b'],
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

  changeView(newView: string) {
    this.setState({
      view: newView,
    });
  }

  render() {
    const { api } = this;
    const { cookies } = this.props;
    const { view, db, user } = this.state;
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
            {user ? (
              <div>
                <AccountName>
                  {user.email}
                </AccountName>
                <Clickable onClick={() => this.logout()}>
                  log out
                </Clickable>
              </div>
            ) : (
                <Clickable onClick={() => this.changeView(Views.Login)}>
                  log in
              </Clickable>
              )}
          </Account>
        </TopBar>
        <Title>
          <h1>short stockpile</h1>
          <div onClick={() => this.api.ping()}> work in progress by @mpaulweeks </div>
        </Title>

        {/* view selector */}
        {view === Views.Gallery && (
          <VideoGallery user={user} cookies={cookies} db={db} api={api} />
        )}
        {view === Views.Login && (
          <Login api={api} />
        )}
      </Container>
    );
  }
}

export const App = withCookies(_App);
