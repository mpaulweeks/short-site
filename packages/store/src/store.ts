import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import fetch from 'node-fetch';
import { Database } from 'short-site-utils';

export class Store {
  dbPath: string;
  constructor() {
    this.dbPath = process.env.IS_DEV ? `../../local/db.json` : 'db.json';
  }
  async downloadDB(): Promise<Database> {
    const url = process.env.IS_DEV ? 'http://localhost:8080/db.json' : 'https://storage.googleapis.com/shortstockpile.com/db.json';
    const resp = await fetch(url);
    const data = await resp.json();
    return new Database(data);
  }
  async updateLocalDB(db: Database): Promise<string> {
    const path = this.dbPath;
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path,
        db.toJson(),
        error => {
          if (error) {
            console.log('Failed to save db locally:', error);
            reject(error);
          } else {
            console.log('Saved db locally');
            resolve(path);
          }
        },
      );
    });
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
