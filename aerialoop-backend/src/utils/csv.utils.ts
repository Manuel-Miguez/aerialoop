import fs from 'fs';
import { parse, Options } from 'csv-parse';

/**
 * Reads CSV given File Instance
 */
export const readCSV = async <T>(file: Express.Multer.File | string, csvOptions: Options | undefined) => {
  const path = typeof file === 'string' ? file : file.path;
  const csvData: T[] = [];
  const readStream = fs.createReadStream(path);
  return new Promise<T[]>((resolve, reject) => {
    readStream
      .pipe(parse(csvOptions))
      .on('data', (row) => csvData.push(row))
      .on('end', () => {
        resolve(csvData);
        readStream.close();
      })
      .on('error', () => {
        reject('Error Reading file');
        readStream.close();
      });
  });
};
