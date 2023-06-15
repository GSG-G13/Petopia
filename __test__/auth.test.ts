import request from "supertest";
import sequelize from "../src/database/config";
import app from "../src/app";
import buildTables from "../src/database/build";

beforeAll(() => buildTables());
afterAll(() => sequelize.close());

describe("Test signup route", () => {
  test("201 | when user enters valid inputs", async () => {
    await request(app)
      .post("/api/v1/auth/signup")
      .send({
        fullName: 'Malek',
        email: 'malek@gmail.com',
        password: '123456789',
        phone: '0569805073',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.message).toEqual("User Created Successfully");
      });
  });

  test("400 | when user enters empty full name Name", async () => {
    await request(app)
      .post("/api/v1/auth/signup")
      .send({
        email: 'malek@gmail.com',
        password: '123456789',
        phone: '0569805073',
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.data).toEqual({"errors": ["Full Name is required"]});
      });
  });

  test("400 | when user enters an existing email", async () => {
    await request(app)
      .post("/api/v1/auth/signup")
      .send({
        fullName: 'Malek',
        email: 'malek@gmail.com',
        password: '123456789',
        phone: '0569805073',
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBe("Email already exists");
      });
  });
})

describe('Test login route', () => {
  test('login successfully with valid credentials', async () => {
    await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'Mohammed@example.com',
        password: '123456789',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe('Login successfully');
      });
  })

  test('400 | when user enter wrong password', async () => {
    await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'Mohammed@example.com',
        password: '12345678',
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBe('Wrong Password');
      });
  })

  test('400 | validation error password min 8 character', async () => {
    await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'Mohammed@example.com',
        password: '12345',
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.data).toEqual({ errors: [ 'password must be at least 8 characters' ] });
      });
  })

  test('400 | validation error password is required', async () => {
    await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'Mohammed@example.com',
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.data).toEqual({ errors: [ 'password is a required field' ] });
      });
  })

  test('401 | when user enter wrong email or not registered', async () => {
    await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'Mohammed5@example.com',
        password: '12345678',
      })
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toBe('Please create an account first');
      });
  })

})
