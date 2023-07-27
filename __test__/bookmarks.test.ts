import request from "supertest";
import app from "../src/app";
import sequelize from "../src/database/config";
import buildTables from "../src/database/build";

beforeAll(() => buildTables());
afterAll(() => sequelize.close());

describe("Test getBookmarks controller", () => {
  test("200 | When Bookmarks are retrieved successfully", async () => {
    const result =     [
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
        expect(res.body.data).toMatchObject(result);
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
        expect(res.body.message).toEqual("Not enough permissions");
      });
  });
});

describe("Test addBookmarks controller", () => {
  test("201 | When Bookmark added successfully", async () => {
    const result = {
      message: 'Bookmark added successfully',
      data: {
        bookmarksId: 4,
        userId: 1,
        postId: 3,
      }
    }

    await request(app)
      .post("/api/v1/bookmarks/3")
      .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)
      .expect(201)
      .expect((res) => {
        expect(res.body).toMatchObject(result);
      });
  });

  test("201 | When Bookmark already exist", async () => {
    const result = {
      message: 'Post already bookmarked',
      data: {
        bookmarksId: 4,
        userId: 1,
        postId: 3,
      }
    }

    await request(app)
      .post("/api/v1/bookmarks/3")
      .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject(result);
      });
  });
});

describe("Test deleteBookmarks controller", () => {
  test("200 | When Bookmark delete successfully", async () => {
    const result = {
      "message": "Bookmark deleted successfully",
      "data": {
          "userId": 1,
          "postId": 3
      }
  }

    await request(app)
      .delete("/api/v1/bookmarks/3")
      .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject(result);
      });
  });

  test("200 | When post isn't bookmarked", async () => {
    await request(app)
      .delete("/api/v1/bookmarks/3")
      .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toEqual('You are not bookmarking this Post');
      });
  });
});