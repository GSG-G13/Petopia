import request from "supertest";
import app from "../src/app";
import sequelize from "../src/database/config";
import buildTables from "../src/database/build";

beforeAll(() => buildTables());
afterAll(() => sequelize.close());

describe("Test User follower controller", () => {
  test("200 | when followers are retrieved", async () => {
    await request(app)
      .get("/api/v1/follow/followers/1")
      .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBeGreaterThan(0);
      });
  });
});


describe("Test addFollow controller", () => {
  test("201 | when user enters valid req", async () => {
    const newFollow = {
      followingId: 1,
      followerId: 3,
    };

    const response = await request(app)
      .post("/api/v1/follow/followers/3")
      .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)
      .expect(201);
    expect(response.body.message).toBe("Follow Created Successfully");
    expect(response.body.data).toMatchObject(newFollow);
  });

  test("400 | when user try to follow himself", async () => {
    const response = await request(app)
      .post("/api/v1/follow/followers/1")
      .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)
      .expect(400);
    expect(response.body.message).toBe("You Cannot follow yourself");
  });
    

    test("400 | when user already follows the user", async () => {
      const response = await request(app)
        .post("/api/v1/follow/followers/3")
        .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)

        .expect(400);
  
      expect(response.body.message).toBe("You already Following this user");
    });

    test("400 | when user enters a not valid followerId", async () => {
      const response = await request(app)
        .post("/api/v1/follow/followers/3a")
        .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)
        .expect(400);
      expect(response.body.data.errors).toEqual([
        "followerId must be a `number` type, but the final value was: `NaN` (cast from the value `\"3a\"`)."
    ]);
    });
  });
  
  describe("Test unFollow controller", () => {
    test("200 | when follow is not found", async () => {
      const response = await request(app)
        .delete("/api/v1/follow/followings/2")
        .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)
        .expect(200);
  
      expect(response.body.message).toEqual("User Unfollowed Successfully");
    });

    test("401 | when follower is not found", async () => {
        const response = await request(app)
          .delete("/api/v1/follow/followings/2")
          .expect(401);
    
        expect(response.body.message).toEqual("unauthorized");
      });

      test("400 | when follower is not found", async () => {
        await request(app)
          .delete("/api/v1/follow/followings/99")
          .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)
          .expect(400)
          .expect((res) => {
            expect(res.body.message).toEqual("You are not following this user")
          });
      });

      test("400 | when followerId is not a number is not found", async () => {
        await request(app)
          .delete("/api/v1/follow/followings/1a")
          .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)
          .expect(400)
          .expect((res) => {
            expect(res.body.data.errors).toEqual([
              "followerId must be a `number` type, but the final value was: `NaN` (cast from the value `\"1a\"`)."
          ])
          });
      });
  });

  
  