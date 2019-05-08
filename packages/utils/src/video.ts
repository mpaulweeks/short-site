export interface VideoData {
  url: string;
  name: string;
  description: string;
  imgUrl: string;
  duration: number;
  created_at: string,
}

export class Video {
  data: VideoData;

  constructor(data) {
    this.data = data;
  }

  static fromVimeo(data: any): Video | null {
    if (!data) {
      return null;
    }
    return new Video({
      url: data.link,
      name: data.name,
      description: data.description,
      imgUrl: data.pictures.sizes.concat().pop().link,
      duration: data.duration,
      created_at: data.release_time,
    });
  }
}

