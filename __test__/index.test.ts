import request from "supertest";
import sequelize from "../src/database/config";
import app from "../src/app";
import buildTables from "../src/database/build";

beforeAll(() => buildTables());
afterAll(() => sequelize.close());

describe("Test signup route", () => {
  test("201 | when user enters valid inputs", async () => {
    await request(app)
      .post("/api/v1/account/signup")
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
      .post("/api/v1/account/signup")
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
      .post("/api/v1/account/signup")
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
