import { Video } from "./video";

export class Database {
  videos: Array<Video>;

  constructor(videos: Array<Video>) {
    this.videos = videos;
  }

  toJson() {
    return JSON.stringify(this.videos.map(v => v.data), null, 2);
  }
}
