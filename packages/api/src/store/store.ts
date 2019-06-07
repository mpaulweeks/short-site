import { Bucket, Storage } from '@google-cloud/storage';
import fs from 'fs';
import fetch from 'node-fetch';
import { Database, Favorites } from '../utils';

export class Store {
  dbFilename = 'db.json';
  favoritesFilename = 'fav.json';
  devUrl = 'http://localhost:8080/';
  prodUrl = 'https://storage.googleapis.com/shortstockpile.com/';

  async downloadDB(): Promise<Database> {
    const url = (process.env.IS_DEV ? this.devUrl : this.prodUrl) + this.dbFilename;
    const resp = await fetch(url);
    const data = await resp.json();
    return new Database(data);
  }
  async downloadFavorites(): Promise<Favorites> {
    const url = (process.env.IS_DEV ? this.devUrl : this.prodUrl) + this.favoritesFilename;
    const resp = await fetch(url);
    const data = await resp.json();
    return new Favorites(data);
  }

  private async updateLocalJson(filename: string, jsonStr: string): Promise<string> {
    const path = `../../local/${filename}`;
    if (!process.env.IS_DEV) {
      return 'not on dev, skipping local update';
    }
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
    return this.updateLocalJson(this.dbFilename, db.toJson());
  }
  async updateLocalFavorites(ff: Favorites): Promise<string> {
    return this.updateLocalJson(this.favoritesFilename, ff.toJson());
  }

  private getBucket(): Bucket {
    const storage = new Storage();
    const bucketName = 'shortstockpile.com';
    return storage.bucket(bucketName);
  }

  async uploadFileToGCP(path: string): Promise<string> {
    await this.getBucket().upload(path, {});
    return path;
  }

  private async uploadJsonToGCP(filename: string, data: string, makePublic?: boolean): Promise<string> {
    const file = this.getBucket().file(filename);
    await file.save(data);
    if (makePublic) {
      await file.makePublic();
    }
    return 'success';
  }
  async uploadDatabaseToGCP(db: Database): Promise<string> {
    return this.uploadJsonToGCP('db.json', db.toJson(), true);
  }
  async uploadFavoritesToGCP(ff: Favorites): Promise<string> {
    return this.uploadJsonToGCP('fav.json', ff.toJson(), true);
  }
}
