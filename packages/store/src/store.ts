import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import fetch from 'node-fetch';
import { Database, Favorites } from 'short-site-utils';

export class Store {
  dbPath: string;
  favoritesPath: string;
  constructor() {
    this.dbPath = process.env.IS_DEV ? `../../local/db.json` : 'db.json';
    this.favoritesPath = process.env.IS_DEV ? `../../local/fav.json` : 'fav.json';
  }
  async downloadDB(): Promise<Database> {
    const url = process.env.IS_DEV ? 'http://localhost:8080/db.json' : 'https://storage.googleapis.com/shortstockpile.com/db.json';
    const resp = await fetch(url);
    const data = await resp.json();
    return new Database(data);
  }
  async downloadFavorites(): Promise<Favorites> {
    const url = process.env.IS_DEV ? 'http://localhost:8080/fav.json' : 'https://storage.googleapis.com/shortstockpile.com/fav.json';
    const resp = await fetch(url);
    const data = await resp.json();
    return new Favorites(data);
  }
  async updateLocalJson(path: string, jsonStr: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path,
        jsonStr,
        error => {
          if (error) {
            console.log(`Failed to save ${path} locally:`, error);
            reject(error);
          } else {
            console.log(`Saved ${path} locally`);
            resolve(path);
          }
        },
      );
    });
  }
  async updateLocalDB(db: Database): Promise<string> {
    return this.updateLocalJson(this.dbPath, db.toJson());
  }
  async updateLocalFavorites(ff: Favorites): Promise<string> {
    return this.updateLocalJson(this.favoritesPath, ff.toJson());
  }
  async uploadToGCP(path: string, makePublic?: boolean): Promise<string> {
    const storage = new Storage();
    const bucketName = 'shortstockpile.com';
    await storage.bucket(bucketName).upload(path, {});
    if (makePublic) {
      const filename = path.split('/').pop() || path;
      await storage.bucket(bucketName).file(filename).makePublic();
    }
    return 'success';
  }
}
