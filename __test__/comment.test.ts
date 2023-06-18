import request from "supertest";
import app from "../src/app";
import sequelize from "../src/database/config";
import buildTables from "../src/database/build";

beforeAll(() => buildTables());
afterAll(() => sequelize.close());

describe("Test addComment controller", () => {
  test("201 | when user enters valid inputs", async () => {
    const newComment = {
      postId: 2,
      commentText: "Test Comment",
    };

    await request(app)
      .post("/api/v1/comments")
      .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)
      .send({ postId: 2, commentText: "Test Comment" })
      .expect(201)
      .expect((res) => {
        expect(res.body.message).toEqual("Comment Created Successfully");
        expect(res.body.data).toMatchObject(newComment);
      });
  });
  test("400 | when user does not provide a commentText", async () => {
    await request(app)
      .post("/api/v1/comments")
      .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)
      .send({})
      .expect(400)
      .expect((res) => {
        expect(res.body.data).toEqual({
          errors: ["commentText is a required field"],
        });
      });
  });
});

describe("Test deleteComment controller", () => {
  test("200 | when comment is deleted successfully", async () => {
    await request(app)
      .delete("/api/v1/comments/1")
      .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toEqual("Comment Deleted Successfully");
      });
  });

  test("404 | when comment is not found", async () => {
    await request(app)
      .delete("/api/v1/comments/820")
      .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual("The Comment Was Not Found");
      });
  });
});

describe("Test updateComment controller", () => {
  test("200 | when comment is updated successfully", async () => {
    const updatedComment = {
      postId: 2,
      commentText: "Updated Comment",
    };

    await request(app)
      .put("/api/v1/comments/3")
      .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)
      .send({ commentText: "Updated Comment" })
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toEqual("Comment Updated Successfully");
        expect(res.body.data).toMatchObject(updatedComment);
      });
  });

  test("404 | when comment is not found", async () => {
    await request(app)
      .put("/api/v1/comments/950")
      .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)
      .send({ commentText: "Updated Comment" })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual("The Comment Was Not Found");
      });
  });

  test("400 | when user does not provide a new comment", async () => {
    await request(app)
      .put("/api/v1/comments/2")
      .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)
      .send({})
      .expect(400)
      .expect((res) => {
        expect(res.body.data).toEqual({
          errors: ["commentText is a required field"],
        });
      });
  });
});

describe("Test getComments controller", () => {
  test("200 | when comments are retrieved successfully", async () => {
    const comments = [
      {
        postId: 1,
        commentText: "Nice work!",
        user: {
          fullName: "Mohammed Sallout",
          userImage: "https://Mohammed.com/user2.jpg",
        },
      },
    ];

    await request(app)
      .get("/api/v1/comments/posts/1")
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toMatchObject(comments);
      });
  });
});

describe("Test getCommentById controller", () => {
  test("200 | when comment is retrieved successfully", async () => {
    const comment = { postId: 1, commentText: "Nice work!" };

    await request(app)
      .get("/api/v1/comments/2")
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toMatchObject(comment);
      });
  });
  test("404 | when  comment is not found", async () => {
    await request(app)
      .get("/api/v1/comments/952")
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toEqual("The Comment Was Not Found");
      });
  });
});
