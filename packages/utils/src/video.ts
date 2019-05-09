export enum VideoHost {
  Vimeo = 'vimeo',
  YouTube = 'youtube',
}

export interface VideoData {
  key: string;
  host: VideoHost;
  url: string;
  name: string;
  description: string;
  imgUrl: string;
  duration: number;
  published_at: string;
  created_at: string;
}

export class Video {
  data: VideoData;

  constructor(data) {
    this.data = data;
  }
  displayHost() {
    switch (this.data.host) {
      case VideoHost.Vimeo:
        return 'Vimeo';
      case VideoHost.YouTube:
        return 'YouTube';
      default:
        return '???';
    }
  }
  displayDuration() {
    const { duration } = this.data;
    const minutes = Math.floor(duration / 60).toString();
    const seconds = (duration % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  static now() {
    return new Date().toISOString().substring(0, 10);
  }
  static fromVimeo(key: string, data: any): Video | null {
    if (!data) {
      return null;
    }
    return new Video({
      key: key,
      host: VideoHost.Vimeo,
      url: data.link,
      name: data.name,
      description: data.description,
      imgUrl: data.pictures.sizes.concat().pop().link,
      duration: data.duration,
      published_at: data.release_time.substring(0, 10),
      created_at: this.now(),
    });
  }
}

