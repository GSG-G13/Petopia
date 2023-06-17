import request from "supertest";
import app from "../src/app";
import addCommentQuery from "../src/queries/comment/addComment";
import deleteCommentQuery from "../src/queries/comment/deleteComment";
import updateCommentQuery from "../src/queries/comment/updateComment";
import getCommentsQuery from "../src/queries/comment/getComments";
import getCommentQuery from "../src/queries/comment/getComment";
import sequelize from "../src/database/config";
import buildTables from "../src/database/build";

beforeAll(() => buildTables());
afterAll(() => sequelize.close());

jest.mock("../src/queries/comment/addComment");
jest.mock("../src/queries/comment/deleteComment");
jest.mock("../src/queries/comment/updateComment");
jest.mock("../src/queries/comment/getComments");
jest.mock("../src/queries/comment/getComment");

describe("Test addComment controller", () => {
  test("201 | when user enters valid inputs", async () => {
    const mockNewComment = {
      postId: 3,
      commentText: "Test Comment",
    };

    (addCommentQuery as jest.Mock).mockResolvedValue(mockNewComment);

    await request(app)
      .post("/api/v1/comment")
      .set("Cookie", `token=${process.env.TOKEN}`)
      .send({ commentText: "Test Comment" })
      .expect(201)
      .expect((res) => {
        expect(res.body.message).toEqual("Comment Created Successfully");
        expect(res.body.data).toEqual(mockNewComment);
      });
  });
  test('400 | when user does not provide a commentText', async () => {
    await request(app)
      .post('/api/v1/comment')
      .set("Cookie", `token=${process.env.TOKEN}`)
      .send({})
      .expect(400)
      .expect((res) => {
        expect(res.body.data).toEqual({"errors": ["commentText is a required field"]});
      });
  });
});

describe('Test deleteComment controller', () => {
  test('200 | when comment is deleted successfully', async () => {
    const mockDeletedComment = {
      postId: 1,
      commentText: 'Deleted Comment',
    };

    (deleteCommentQuery as jest.Mock).mockResolvedValue(mockDeletedComment);

    await request(app)
      .delete('/api/v1/comment/1')
      .set("Cookie", `token=${process.env.TOKEN}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toEqual('Comment Deleted Successfully');
        expect(res.body.data).toEqual(mockDeletedComment);
      });
  });

  test('404 | when comment is not found', async () => {
    (deleteCommentQuery as jest.Mock).mockResolvedValue(null);

    await request(app)
      .delete('/api/v1/comment/820')
      .set("Cookie", `token=${process.env.TOKEN}`)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual('The Comment Was Not Found');
      });
  });
});

describe('Test updateComment controller', () => {
  test('200 | when comment is updated successfully', async () => {
    const mockUpdatedComment = {
      postId: 1,
      commentText: 'Updated Comment',
    };

    (updateCommentQuery as jest.Mock).mockResolvedValue(mockUpdatedComment);

    await request(app)
      .put('/api/v1/comment/1')
      .set("Cookie", `token=${process.env.TOKEN}`)
      .send({ commentText: 'Updated Comment' })
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toEqual('Comment Updated Successfully');
        expect(res.body.data).toEqual(mockUpdatedComment);
      });
  });

  test('404 | when comment is not found', async () => {
    (updateCommentQuery as jest.Mock).mockResolvedValue(null);

    await request(app)
      .put('/api/v1/comment/950')
      .set("Cookie", `token=${process.env.TOKEN}`)
      .send({ commentText: 'Updated Comment' })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual('The Comment Was Not Found');
      });
  });

  test('400 | when user does not provide a new comment', async () => {
    (updateCommentQuery as jest.Mock).mockResolvedValue(null);

    await request(app)
      .put('/api/v1/comment/1')
      .set("Cookie", `token=${process.env.TOKEN}`)
      .send({})
      .expect(400)
      .expect((res) => {
        expect(res.body.data).toEqual({"errors": ["commentText is a required field"]});
      });
  });
});

describe("Test getComments controller", () => {
  test("200 | when comments are retrieved successfully", async () => {
    const mockComments = [
      { userId: 1, postId: 1, commentText: "Comment 1" },
      { userId: 2, postId: 1, commentText: "Comment 2" },
    ];

    (getCommentsQuery as jest.Mock).mockResolvedValue(mockComments);

    await request(app)
      .get("/api/v1/post/1/comments")
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toEqual(mockComments);
      });
  });
});

describe("Test getCommentById controller", () => {
  test("200 | when comment is retrieved successfully", async () => {
    const mockComment = { userId: 1, postId: 1, commentText: "Comment 1" };
    (getCommentQuery as jest.Mock).mockResolvedValue(mockComment);

    await request(app)
      .get("/api/v1/comment/9")
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toEqual(mockComment);
      });
  });
  test("404 | when  comment is not found", async () => {
    (getCommentQuery as jest.Mock).mockResolvedValue(null);

    await request(app)
      .get("/api/v1/comment/952")
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toEqual("The Comment Was Not Found");
      });
  });
});
