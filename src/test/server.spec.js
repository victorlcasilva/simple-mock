const express = require('express');
const request = require('supertest');
const routes = require('../routes');

const app = express();
app.use('/', routes);

describe('Server Tests', () => {
  it('Not found request', async () => {
    const res = await request(app)
      .post('/teste')
      .send({ test: 1 });
    expect(res.statusCode).toEqual(404);
  });

  it('Debug request', async () => {
    const res = await request(app)
      .get('/teste?x=y')
      .set('debug', '1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('path');
    expect(res.body.path).toEqual('/teste');
    expect(res.body).toHaveProperty('params');
    expect(res.body.params).toHaveProperty('x');
    expect(res.body.params.x).toEqual('y');
    expect(res.body).toHaveProperty('headers');
    expect(res.body.headers).toHaveProperty('debug');
    expect(res.body.headers.debug).toEqual('1');
  });

  it('Mock request', async () => {
    const res = await request(app)
      .get('/test?name=you');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual('Hello You!');
    expect(res.headers).toHaveProperty('mock');
    expect(res.headers.mock).toEqual('enabled');
  });
});
