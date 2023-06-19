import request from "supertest";
import app from "../src/app";
import sequelize from "../src/database/config";
import buildTables from "../src/database/build";

beforeAll(() => buildTables());
afterAll(() => sequelize.close());

describe("Test getAllUsers controller", () => {
  test("200 | when users are retrieved successfully", async () => {
    const users = [
      {
        fullName: "Abdallah Abujazar",
        email: "Abujazar@example.com",
        address: "123 Main St, Gaza",
        phone: "123-456-7890",
      },
      {
        fullName: "Mohammed Sallout",
        email: "Mohammed@example.com",
        address: "456 Elm St, Khaniones",
        phone: "987-654-3210",
      },
      {
        fullName: "Muhammad Abdulhadi",
        email: "mu7ammadabed@gmail.com",
        address: "456 Elm St, Khaniones",
        phone: "987-654-3210",
      },
    ];

    await request(app)
      .get("/api/v1/users")
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toMatchObject(users);
      });
  });

  test("200 | when users page=2 and limit=1", async () => {
    const users = [
      {
        fullName: "Mohammed Sallout",
        email: "Mohammed@example.com",
        address: "456 Elm St, Khaniones",
        phone: "987-654-3210",
      },
    ];

    await request(app)
      .get("/api/v1/users?page=2&limit=1")
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toMatchObject(users);
      });
  });

  test("400 | when users limit more than 100 in page", async () => {

    await request(app)
      .get("/api/v1/users?page=1&limit=150")
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBe("limit should not be more than 100");
      });
  });
});

describe("Test getUserById controller", () => {
  test("200 | when user is retrieved successfully", async () => {
    const user = {
      fullName: "Mohammed Sallout",
      email: "Mohammed@example.com",
      address: "456 Elm St, Khaniones",
      phone: "987-654-3210",
    };

    await request(app)
      .get("/api/v1/users/2")
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toMatchObject(user);
      });
  });
  test("404 | when  user is not found", async () => {
    await request(app)
      .get("/api/v1/users/560")
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toEqual("user not found");
      });
  });
});
