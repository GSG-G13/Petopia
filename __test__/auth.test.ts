import request from 'supertest'
import app from '../src/app'

describe('loginUsers', () => {
  test('should login successfully with valid credentials', done => {
    request(app)
      .post('/api/v1/login')
      .send({
        email: 'Mohammed@example.com',
        password: 'password456',
      })
      .expect(202)
      .expect('Content-Type', /json/)
      .end((err) => {
        if(err) {
          return done(err)
        }
        done()
      })
  })
})