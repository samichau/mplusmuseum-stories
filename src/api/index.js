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

function resolver(response) {
  return new Response(true, response);
}

function rejector(error) {
  const response = error.response ? error.response : {
    status: false,
    data: {
      errors: ['There was a network error. Please check your internet connection.'],
    },
  };
  return Promise.reject(new Response(false, response));
}

export function asyncGet(path) {
  const endpoint = `${apiUrl}/${path}`;
  return axios.get(endpoint).then(resolver).catch(rejector);
}

export function asyncPost(path, data) {
  const endpoint = `${apiUrl}/${path}`;
  return axios.post(endpoint, data).then(resolver).catch(rejector);
}
