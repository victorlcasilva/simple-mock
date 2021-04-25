const express = require('express');
const index = express.Router();
const getMock = require('./mock');

function debugResponse (req) {
  if (!req || !req.method || !req.headers || !req.header('debug')) {
    return;
  }
  if (req.method.toLowerCase() === 'get' && req.header('debug') === '1') {
    return { path: req.path, params: req.query, headers: req.headers };
  }
}

index.all('*', (req, res) => {
  const debug = debugResponse(req, res);
  if (debug) {
    return res.json(debug);
  }

  const mocked = getMock(req);
  if (mocked && mocked.body) {
    if (mocked.headers) {
      Object.keys(mocked.headers).forEach(header => {
        res.header(header, mocked.headers[header]);
      });
    }
    return res.json(mocked.body);
  }

  return res.sendStatus(404);
});

module.exports = index;
