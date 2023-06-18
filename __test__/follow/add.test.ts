import request from 'supertest';
import app from '../../src/app'; // your Express application
import sequelize from "../../src/database/config";

describe('POST /follow', () => {
  const user = { userId: 1 };

  beforeAll(async () => {
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('creates a new follow and returns a 201 status code and a message', async () => {
    const followerData = {
      followingId: 1,
      followerId: 2
    };
    const response = await request(app)
    .post('/follow')
    .send(followerData)
    .set('followerId', user.userId.toString());

    await request(app)
    .post('/follow')
    .send(followerData)
    .set('followingId', user.userId.toString());

    expect(response.status).toBe(201);
    expect(response.body.data).toBe('Follow Created Successfully');
    expect(response.body.data).toEqual(expect.objectContaining(followerData));
    });

    it('returns a 400 status code when followerId is not provided', async () => {
        const followerData = {};
      
        const response = await request(app)
          .post('/follow')
          .send(followerData)
          .set('userId', user.userId.toString());
      
        expect(response.status).toBe(404);
      });

});
