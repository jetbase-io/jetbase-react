import { decamelizeKeys } from 'humps';

export const destroy = (url, headers, success, fail) => (
  fetch(url, { method: 'DELETE', headers })
    .then(
      (response) => {
        if (!response.ok) throw response;
        return response.json();
      },
      error => error,
    )
    .then(success)
    .catch(fail)
);

export const get = (url, headers, success, fail) => (
  fetch(url, { method: 'GET', headers })
    .then(
      (response) => {
        if (!response.ok) throw response;
        return response.json();
      },
      error => error,
    )
    .then(success)
    .catch(fail)
);

export const post = (url, headers, params, success, fail) => {
  const body = JSON.stringify(decamelizeKeys(params));
  return fetch(url, { method: 'POST', headers, body })
    .then(
      (response) => {
        if (!response.ok) throw response;
        return response.json();
      },
      error => error,
    )
    .then(success)
    .catch(fail);
};

export const put = (url, headers, params, success, fail) => {
  const body = JSON.stringify(decamelizeKeys(params));
  return fetch(url, { method: 'PUT', headers, body })
    .then(
      (response) => {
        if (!response.ok) throw response;
        return response.json();
      },
      error => error,
    )
    .then(success)
    .catch(fail);
};

export default get;
