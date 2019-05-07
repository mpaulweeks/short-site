export interface VideoData {
  url: string;
  name: string;
  description: string;
  imgUrl: string;
  duration: number;
}

export class Video {
  data: VideoData;

  constructor(data) {
    this.data = data;
  }

  static fromVimeo(data: any) {
    return new Video({
      url: data.link,
      name: data.name,
      description: data.description,
      imgUrl: data.pictures.sizes.concat().pop().link,
      duration: data.duration,
    });
  }
}

