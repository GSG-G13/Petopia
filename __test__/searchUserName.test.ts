import request from 'supertest';
import app from '../src/app';
import sequelize from "../src/database/config";
import buildTables from "../src/database/build";

beforeAll(() => buildTables());
afterAll(() => sequelize.close());

describe('Test search result controller', () => {
  test('200 | when categories are retrieved successfully', async () => {
    await request(app)
      .get('/api/v1/users/search?fullName=jaza&page=1&limit=10')
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toEqual('Users Retrieved Successfully');
        expect(res.body.data).toMatchObject(
            [{
            fullName: "Abdallah Abujazar",
            email: "Abujazar@example.com",
            address: "123 Main St, Gaza",
            phone: "123-456-7890",
            profileImage: "https://Abujazar.com/profile1.jpg",
            userImage: "https://Abujazar.com/user1.jpg"
        }]);
      });
  });

  test('404 | when  user is not found', async () => {
    await request(app)
      .get('/api/v1/users/search?fullName=10mm&page=1&limit=10')
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toEqual('No users found');
      });
  });

  test('404 | when  fullname  is empty', async () => {
    await request(app)
      .get('/api/v1/users/search?fullName=&page=1&limit=10')
      .expect(400)
      .expect((res) => {
        expect(res.body.data.errors[0]).toEqual('Full Name is required');
      });
  });

});

