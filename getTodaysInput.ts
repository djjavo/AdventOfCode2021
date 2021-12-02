import fetch from 'node-fetch';
import fs from 'fs';
import { session } from './token.json';

const baseUrl = 'https://adventofcode.com';
const localUrl = './src/inputs';

const getDay = (): number => {
  const date = new Date();
  const month = date.getMonth();

  if (month === 11) {
    return date.getDate();
  }

  return 0;
};

const getInput = (day: number): Promise<string | void> =>
  fetch(`${baseUrl}/2021/day/${day}/input`, {
    headers: {
      cookie: `session=${session}`
    }
  })
    .then(res => res.text())
    .catch(e => console.log(e))
    .finally(() => '');

const day = getDay();

if (day > 0 && day < 26) {
  getInput(day).then(input => {
    if (input) {
      const path = `${localUrl}/day${day}.json`;
      const json = JSON.stringify(input.trim().split('\n'));
      fs.writeFile(path, json, {}, err => {
        if (err) console.log(err);
        else console.log(`Complete! Downloaded to ${path}`);
      });
    }
  });
}
