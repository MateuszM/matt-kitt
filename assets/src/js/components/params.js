location.params = function(params) {
  var obj = {}, i, parts, len, key, value;

  if (typeof params === 'string') {
    value = location.search.match(new RegExp('[?&]' + params + '=?([^&]*)[&#$]?'));
    return value ? value[1] : undefined;
  }

  var _params = location.search.substr(1).split('&');

  for (i = 0, len = _params.length; i < len; i++) {
    parts = _params[i].split('=');
    if (! parts[0]) {continue;}
    obj[parts[0]] = parts[1] || true;
  }

  if (typeof params !== 'object') {return obj;}

  for (key in params) {
    value = params[key];
    if (typeof value === 'undefined') {
      delete obj[key];
    } else {
      obj[key] = value;
    }
  }

  parts = [];
  for (key in obj) {
    parts.push(key + (obj[key] === true ? '' : '=' + obj[key]));
  }

  location.search = parts.join('&');
};