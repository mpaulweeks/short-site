import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import { Database } from './database';

export class Store {
  dbPath: string;
  constructor() {
    this.dbPath = process.env.IS_DEV ? `../../local/db.json` : 'db.json';
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
  async uploadToGCP(path: string): Promise<string> {
    const storage = new Storage();
    await storage.bucket('shortstockpile.com').upload(path, {});
    return 'success';
  }
}
