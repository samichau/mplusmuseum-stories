import axios from 'axios';

export const apiUrl = process.env.API_URL;

export class Response {
  constructor(resolved, response) {
    this.resolved = resolved;
    this.status = response ? response.status : false;
    this.data = response ? response.data : false;
    return this;
  }

}

export function asyncGet(path) {
  const endpoint = `${apiUrl}/${path}`;
  return new Promise((resolve, reject) => {
    axios.get(endpoint)
      .then((response) => {
        resolve(new Response(true, response));
      })
      .catch((error) => {
        reject(new Response(false, error.response));
      });
  });
}
