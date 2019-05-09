import { sortObjs } from "./tools";
import { Video, VideoData } from "./video";

interface File {
  videos: Array<VideoData>;
  blacklist: Array<string>;
};
interface VideoLookup {
  [key: string]: Video;
};

export interface VideoQuery {
  sortCallback?: (v: Video) => any,
  reverse?: boolean,
};
interface VideoQueryFull {
  sortCallback: (v: Video) => any,
  reverse: boolean,
};
const defaultQuery: VideoQueryFull = {
  sortCallback: v => v.data.key,
  reverse: false,
};
function combineQuery(query?: VideoQuery): VideoQueryFull {
  let full = { ...defaultQuery };
  Object.keys(defaultQuery).forEach(key => {
    if (query && query[key] !== undefined) {
      full[key] = query[key];
    }
  });
  return full;
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
  getVideos(query?: VideoQuery): Array<Video> {
    const { lookup } = this;
    const fullQuery = combineQuery(query);
    const videos = Object.keys(lookup).map(k => lookup[k]);
    const sorted = sortObjs(videos, fullQuery.sortCallback);
    return fullQuery.reverse ? sorted.reverse() : sorted;
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
