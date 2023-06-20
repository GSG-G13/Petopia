import request from 'supertest';
import app from '../src/app';
import sequelize from "../src/database/config";
import buildTables from "../src/database/build";

beforeAll(() => buildTables());
afterAll(() => sequelize.close());



describe('Test updateProfile controller', () => {
  test('200 | when Profile is updated successfully', async () => {

    await request(app)
      .put('/api/v1/users/')
      .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)
      .send({ 
        "fullName": "Abdallah Abujazar1",
        "email": "Abujazar@example.com1",
        "password": "1234567890",
        "userImage": "https://Abujazar.com/user1.jpg1",
        "profileImage": "https://Abujazar.com/profile1.jpg1",
        "address": "123 Main St, Gaza1",
        "phone": "123-456-78901"
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toEqual('User Profile Updated Successfully');
        expect(res.body.data.user).toMatchObject({
         
          "fullName": "Abdallah Abujazar1",
          "email": "Abujazar@example.com1",
          "userImage": "https://Abujazar.com/user1.jpg1",
          "profileImage": "https://Abujazar.com/profile1.jpg1",
          "address": "123 Main St, Gaza1",
          "phone": "123-456-78901",
          "status": "active",
          "userType": "regular"
            });
      });
  });

  test('404 | when user is unauthorized to update this user', async () => {
    await request(app)
      .put('/api/v1/users/')
      .send({ 
        "fullName": "Abdallah Abujazar1",
        "email": "Abujazar@example.com1",
        "password": "1234567890",
        "userImage": "https://Abujazar.com/user1.jpg1",
        "profileImage": "https://Abujazar.com/profile1.jpg1",
        "address": "123 Main St, Gaza1",
        "phone": "123-456-78901"
  })
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toEqual('unauthorized');
      });
  });

});
