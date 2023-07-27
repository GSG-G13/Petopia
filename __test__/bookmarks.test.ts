import request from "supertest";
import app from "../src/app";
import sequelize from "../src/database/config";
import buildTables from "../src/database/build";

beforeAll(() => buildTables());
afterAll(() => sequelize.close());

describe("Test getBookmarks controller", () => {
  test("200 | When Bookmarks are retrieved successfully", async () => {
    const comments =     [
        {
          bookmarksId: 1,
          userId: 1,
          postId: 1,
          post: {
          }
        },
        {
          bookmarksId: 3,
          userId: 1,
          postId: 2,
          post: {
          }
        }
      ]

    await request(app)
      .get("/api/v1/bookmarks")
      .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toMatchObject(comments);
      });
  });

  test("401 | When No user is logged in", async () => {
    await request(app)
      .get("/api/v1/bookmarks")
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toEqual("unauthorized");
      });
  });

  test("403 | When the admin try to view bookmarks", async () => {
    await request(app)
      .get("/api/v1/bookmarks")
      .set("Cookie", `token=${process.env.TOKEN_ADMIN}`)
      .expect(403)
      .expect((res) => {
        console.log(res.body)
        expect(res.body.message).toEqual("Not enough permissions");
      });
  });
});