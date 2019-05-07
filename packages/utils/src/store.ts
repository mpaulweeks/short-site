import fs from 'fs';
import { Database } from './database';

export class Store {
  async uploadDB(db: Database): Promise<string> {
    return new Promise((resolve, reject) => {
      if (process.env.IS_DEV) {
        fs.writeFile(
          `../../local/db.json`,
          db.toJson(),
          error => {
            if (error) {
              console.log('Failed to save db locally:', error);
              reject(error);
            } else {
              console.log('Saved db locally');
              resolve();
            }
          },
        );
      }
    });
  }
}
