import request from "supertest";
import app from "../src/app";
import sequelize from "../src/database/config";
import buildTables from "../src/database/build";

beforeAll(() => buildTables());
afterAll(() => sequelize.close());

describe("Test Post Likers controller", () => {
  test("201 | when Post are retrieved ", async () => {
    const likes = [   {
      "userId": 1,
      "postId": 1,
      "user.fullName": "Abdallah Abujazar",
      "user.userImage": "https://Abujazar.com/user1.jpg"
  },
  {
      "likeId": 2,
      "userId": 2,
      "postId": 1,
      "user.fullName": "Mohammed Sallout",
      "user.userImage": "https://Mohammed.com/user2.jpg"
  } ]

    await request(app)
      .get("/api/v1/like/likers/1")
      .expect(201)
      .expect((res) => {
        expect(res.body.data).toMatchObject(likes);
      });
  });


});



describe("Test addLike controller", () => {
  test("201 | when user enters valid req", async () => {
    const newLike = {
          "userId": 1,
          "postId": 2,
  };

    await request(app)
      .post("/api/v1/like/")
      .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)
      .send({ postId: 2 })
      .expect(201)
      .expect((res) => {
        expect(res.body.message).toBe("Like Created Successfully");
        expect(res.body.data).toMatchObject(newLike);
      });
  });
});



describe("Test unLike controller", () => {
  test("200 | when like is deleted successfully", async () => {
    await request(app)
      .delete("/api/v1/like/")
      .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)
      .send({ postId: 2 })
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe("Post unliked Successfully");
      });
  });


  test("404 | when like is not found", async () => {
    await request(app)
      .delete("/api/v1/like/")
      .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)
      .send({ postId: 24345345 })

      .expect(404)
      .expect((res) => {
        expect(res.body.message).toEqual("Like not found");
      });
  });
});