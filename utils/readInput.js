import * as fs from 'fs';
import { parse } from 'csv-parse';

export const readInput = async () => {
  const records = [];
  const parser = fs
    .createReadStream("input/input.csv")
    .pipe(parse({
    delimiter: ","
    }));
  for await (const record of parser) {
    records.push(record);
  }
  return records;
};
