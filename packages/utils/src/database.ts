import { sortObjs } from "./tools";
import { Video, VideoData } from "./video";

export interface DatabaseFile {
  videos: Array<VideoData>;
  blacklist: Array<string>;
};
interface VideoLookup {
  [id: string]: Video;
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
  sortCallback: v => v.data.name,
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
  byId: VideoLookup;
  byUrl: VideoLookup;
  blacklist: Array<string>;

  constructor(file: DatabaseFile) {
    const videos = file.videos.map(vd => new Video(vd));
    this.byId = videos.reduce((obj, v) => {
      obj[v.data.id] = v;
      return obj;
    }, {});
    this.byUrl = videos.reduce((obj, v) => {
      obj[v.data.url] = v;
      return obj;
    }, {});
    this.blacklist = file.blacklist;
  }

  addVideo(video: Video) {
    const { id, url } = video.data;
    if (!this.byId[id] && !this.byUrl[url] && !this.blacklist.includes(url)) {
      this.byId[id] = video;
      this.byUrl[url] = video;
    }
  }
  getVideos(query?: VideoQuery): Array<Video> {
    const { byId } = this;
    const fullQuery = combineQuery(query);
    const videos = Object.keys(byId).map(k => byId[k]);
    const sorted = sortObjs(videos, fullQuery.sortCallback);
    return fullQuery.reverse ? sorted.reverse() : sorted;
  }
  contains(url: string): boolean {
    return !!this.byUrl[url];
  }

  toJson(): string {
    const data: DatabaseFile = {
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

export interface FavoritesFile {
  user: {
    [email: string]: Array<string>,
  }
  video: {
    [videoId: string]: number,
  },
}

export class Favorites {
  file: FavoritesFile;
  constructor(file: FavoritesFile) {
    this.file = file;
  }

  addFavorite(email: string, videoId: string) {
    const { file } = this;
    file.user[email] = Array.from(new Set([
      ...(file.user[email] || []), videoId,
    ]));
    file.video[videoId] = (file.video[videoId] || 0) + 1;
  }
  removeFavorite(email: string, videoId: string) {
    const { file } = this;
    file.user[email] = (file.user[email] || []).filter(id => id !== videoId);
    file.video[videoId] = (file.video[videoId] || 1) - 1;
  }

  getUser(email: string): Array<string> {
    return this.file.user[email] || [];
  }

  toJson(): string {
    return JSON.stringify(this.file, null, 2);
  }
}
