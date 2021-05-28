  
'use strict';

const base64 = require('base-64');
const supergoose = require('@code-fellows/supergoose');
const server = require('../src/server');
const request = supergoose(server.app);

describe('POST /signup ', () => {
  it('Should create new user and return record', async () => {
    let response = await request
      .post('/api/v1/signup')
      .send({ username: 'anwar', password: '123' });
    expect(response.body.username).toEqual('anwar');
    expect(response.status).toEqual(201);
  });
  it('POST /signin ', async () => {
    let user = base64.encode(`anwar:123`);
    let response = await request
      .post('/api/v1/signin')
      .set(`Authorization`, `Basic ${user}`);
    expect(response.body.user.username).toEqual('anwar');
    expect(response.status).toEqual(200);
  });
});

describe('Need tests for auth middleware and the routes', () => {
  it('Does the middleware function (send it a basic header)', async () => {
    let user = base64.encode(`anwar:123`);
    let response = await request
      .post('/api/v1/signin')
      .set(`Authorization`, `Basic ${user}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();

  });
  it('Do the routes assert the requirements (signup/signin)', async () => {
    let response = await request.post('/');
    expect(response.status).toBe(404);
  });
});
  
describe('Not found errors', () => {
  it('should return a 404 error on bad route', async () => {
    let response = await request.get('/foo');
    expect(response.status).toEqual(404);
  });
  it('should return a 404 error on bad method', async () => {
    let response = await request.post('/foo');
    expect(response.status).toEqual(404);
  });
});