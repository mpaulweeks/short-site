import { Video, VideoData } from "./video";

export class Database {
  videos: Array<Video>;

  constructor(videos: Array<Video>) {
    this.videos = videos;
  }

  toJson(): string {
    return JSON.stringify(this.videos.map(v => v.data), null, 2);
  }
  static fromData(data: Array<VideoData>): Database {
    return new Database(data.map(vd => new Video(vd)));
  }
}
