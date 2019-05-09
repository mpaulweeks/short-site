import { sortObjs } from "./tools";
import { Video, VideoData } from "./video";

interface File {
  videos: Array<VideoData>;
  blacklist: Array<string>;
};
interface VideoLookup {
  [key: string]: Video;
}

export class Database {
  lookup: VideoLookup;
  blacklist: Array<string>;

  constructor(file: File) {
    const videos = file.videos.map(vd => new Video(vd));
    this.lookup = videos.reduce((obj, v) => {
      obj[v.data.key] = v;
      return obj;
    }, {});
    this.blacklist = file.blacklist;
  }

  addVideo(video: Video) {
    const { key } = video.data;
    if (!this.lookup[key] && !this.blacklist.includes(key)) {
      this.lookup[key] = video;
    }
  }
  getVideos(): Array<Video> {
    const { lookup } = this;
    const videos = Object.keys(lookup).map(k => lookup[k]);
    return sortObjs(videos, v => v.data.created_at).reverse();
  }
  contains(key: string): boolean {
    return !!this.lookup[key];
  }

  toJson(): string {
    const data: File = {
      videos: this.getVideos().map(v => v.data),
      blacklist: this.blacklist,
    };
    return JSON.stringify(data, null, 2);
  }
  static makeEmpty(): Database {
    return new Database({
      videos: [],
      blacklist: [],
    });
  }
}
