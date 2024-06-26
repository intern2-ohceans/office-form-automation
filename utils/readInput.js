import * as fs from 'fs';
import { parse } from 'csv-parse';

//function to parse data from a csv file

export async function readInput () {
  console.log("Reading input...")
  const records = [];
  //Read from input.csv and parse each row
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
