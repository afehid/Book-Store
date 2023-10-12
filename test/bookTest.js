/* eslint-disable*/
const request = require('supertest');
const app = require('../Server/app');

describe('GET /books', function() {
  it('return list of books', function() {
    request(app)
      .get('/api/v1/books')
      .expect(200)
      .expect('Content-Type', /json/)
      .end();
    //   .expect('[{"name":"ej","age":26},{"name":"jh","age":28}]');
  });
});
