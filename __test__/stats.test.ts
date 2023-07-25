import request from "supertest";
import sequelize from "../src/database/config";
import app from "../src/app";
import buildTables from "../src/database/build";
import { config } from "dotenv";

config()

const { TOKEN_ADMIN } = process.env

beforeAll(() => buildTables());
afterAll(() => sequelize.close());

describe("Test get stats route", () => {
    test("200 | get stats when data is available", async () => {
        await request(app)
            .get("/api/v1/stats/")
            .set("cookie", `token=${TOKEN_ADMIN}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.data).toEqual(
                    {
                        postsCount: 3,
                        categoriesCount: 4,
                        usersCount: 3
                    });
            });
    });
    test("401 | get stats when data is available but user not authenticated", async () => {
        await request(app)
            .get("/api/v1/stats/")
            .expect(401)
            .expect((res) => {
                expect(res.body.message).toEqual('unauthorized');
            });
    })
    
})