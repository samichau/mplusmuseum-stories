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

function validateResponse(response) {
  return !!response.data.generated;
}

function resolver(response) {
  // Even if we got a 200 OK response, the response data may not be valid. For
  // example it may not be valid JSON. All API requests should return a valid
  // JSON object with a 'generated' property, so check if that exists ...
  if (validateResponse(response)) return new Response(true, response);
  return Promise.reject(response);
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

export function asyncGet(path, params = {}) {
  const endpoint = `${apiUrl}/${path}`;
  return axios.get(endpoint, { params }).then(resolver).catch(rejector);
}

export function asyncPost(path, data) {
  const endpoint = `${apiUrl}/${path}`;
  return axios.post(endpoint, data).then(resolver).catch(rejector);
}
