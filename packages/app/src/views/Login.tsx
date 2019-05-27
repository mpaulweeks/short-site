import React from 'react';
import styled from 'styled-components';
import { Api } from '../api';

const EmailInput = styled.input`
  font-size: 1.5rem;
`;

interface Props {
  api: Api;
}
interface State {
  draft: string;
  email?: string;
  url?: string;
};

export class Login extends React.Component<Props, State> {
  state: State = {
    draft: '',
  };

  onChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      draft: event.target.value,
    });
  }
  onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { draft } = this.state;
    if (draft) {
      this.setState({
        email: draft,
      });
      this.requestLogin(draft);
    }
  }
  async requestLogin(email: string) {
    const { api } = this.props;
    const { token } = await api.requestLogin(email);
    this.setState({
      url: `/?token=${token}`,
    });
  }
  render() {
    const { email, url } = this.state;
    if (email && !url) {
      return (
        <div>
          please wait, communicating with server...
        </div>
      )
    }
    if (email) {
      return (
        <div>
          our email service is down. click <a href={url}>here</a> to login
        </div>
      );
    }
    return (
      <div>
        <form onSubmit={e => this.onSubmit(e)}>
          <label>
            Enter your email to login / create an account
              <br />
            <EmailInput type="text" name="email" onChange={e => this.onChange(e)} />
          </label>
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}
