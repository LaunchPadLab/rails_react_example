function _fetch(url, options) {
  return fetch(url, options)
    .then(response=>{
      return response.json();
    })
    .catch(err=>{
      console.log('There was an error processing your request');
      console.log(err);
    });
}

function get(url, options={}) {

  const defaultOptions = {
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json'
    }
  };

  return _fetch(url, Object.assign({}, defaultOptions, options));
}

function post(url, payload, options) {

  const defaultOptions = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'X-CSRF-Token':  document.getElementsByName("csrf-token")[0].content,
      'Accept':       'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  };

  return _fetch(url, Object.assign({}, defaultOptions, options));
}

function patch(url, payload, options) {
  const _options = Object.assign({}, options, {method: 'PATCH'});
  return post(url, payload, _options);
}
