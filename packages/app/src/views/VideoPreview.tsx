import React from 'react';
import styled from 'styled-components';
import { Video } from 'short-site-utils';
import { Api } from '../api';
import { User } from '../user';
import { FlexColumnMixin, AnimateShake } from './common';

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
  position: relative;
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

const Favorite = styled.img`
  width: 2rem;
  height: 1.6rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;
const FavoriteLoading = styled(Favorite)`
  animation-name: ${AnimateShake};
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

interface Props {
  setFavorite: (email: string, videoId: string, isFav: boolean) => void;
  video: Video;
  user?: User;
};
interface State {
  loading: boolean;
}

export class VideoPreview extends React.Component<Props, State> {
  state = {
    loading: false,
  };
  componentDidUpdate(prevProps: Props) {
    if (JSON.stringify(prevProps.user) !== JSON.stringify(this.props.user)) {
      this.setState({
        loading: false,
      });
    }
  }

  isFav(): (boolean | undefined) {
    const { video, user } = this.props;
    const favorites = user && user.favorites;
    return favorites && favorites.includes(video.data.id);
  }
  toggleFavorite(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    e.nativeEvent.preventDefault();
    if (this.state.loading) {
      // ignore clicks while waiting on api
      return;
    }
    const { video, user } = this.props;
    const isFav = this.isFav();
    if (user === undefined) {
      throw 'cannot toggle favorite for undefined user';
    }
    this.setState({
      loading: true,
    }, () => {
      this.props.setFavorite(user.email, video.data.id, !isFav);
    });
  }
  render() {
    const { video, user } = this.props;
    const { loading } = this.state;
    const isFav = this.isFav();
    const favSrc = `img/heart_${isFav ? 'red' : 'white'}.png`;
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
              Published on {video.displayHost()}
              <br />
              {video.data.published_at}
            </PublishDate>
            <Duration>
              {video.displayDuration()}
            </Duration>
          </SubtitleRow>
          {isFav !== undefined && (
            loading ? (
              <FavoriteLoading src={favSrc} />
            ) : (
                <Favorite src={favSrc} onClick={e => this.toggleFavorite(e)} />
              )
          )}
        </DetailsContainer>
      </Container>
    )
  }
}
