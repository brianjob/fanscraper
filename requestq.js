var Q   = require('q'),
request = require('request');

module.exports = function(url) {
  var deferred = Q.defer();
  
  request(url, function(err, response, body) {
    deferred.notify(response);
    if (err) {
      err.response = response;
      deferred.reject(err);
    } else {
      deferred.resolve({response: response, body: body});
    }
  });

  return deferred.promise;
};

