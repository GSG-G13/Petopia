import request from "supertest";
import app from "../src/app";
import sequelize from "../src/database/config";
import buildTables from "../src/database/build";
import { config } from "dotenv";

config()

const { TOKEN_REGULAR } = process.env
beforeAll(() => buildTables());
afterAll(() => sequelize.close());

describe('Test Get a specified post.', () => {
    test('200 | get a specified post that have postId = 1', async () => {
        const firstPost = {
            postId: 1,
            userId: 1,
            categoryId: 1,
            postContent: "This is a regular post.",
            isHaveImg: true,
            likesCount: 2,
            commentsCount: 2,
            postImages: [
                {
                    imageId: 1,
                    postId: 1,
                    imageUrl: "https://example.com/image1.jpg",
                },
                {
                    imageId: 3,
                    postId: 1,
                    imageUrl: "https://example.com/image3.jpg",
                }
            ],
            category: {
                title: "Adoption"
            },
            user: {
                userId: 1,
                fullName: "Abdallah Abujazar",
                userImage: "https://Abujazar.com/user1.jpg"
            },
            products: [],
            pets: [
                {
                    petId: 1,
                    postId: 1,
                    petName: "Max",
                    type: 1,
                    age: 3,
                    gender: "Male",
                    healthStatus: "Healthy",
                    adoptionStatus: "Available",
                    petType: {
                        title: "Dog"
                    }
                }
            ]
        }
        await request(app)
            .get('/api/v1/posts/1')
            .expect(200)
            .expect((res) => {
                expect(res.body.data).toMatchObject(firstPost)
            })
    })
    test('404 | when user trying to get an unavailable post', async () => {
        await request(app)
            .get('/api/v1/posts/4')
            .expect(404)
            .expect((res) => {
                expect(res.body.message).toBe('post not found')
            })
    })
})
describe('Test Get explore posts', () => {
    const explorePosts = [
        {
            postId: 1,
            userId: 1,
            categoryId: 1,
            postContent: "This is a regular post.",
            isHaveImg: true,
            likesCount: 2,
            commentsCount: 2,
            postImages: [
                {
                    imageId: 3,
                    postId: 1,
                    imageUrl: "https://example.com/image3.jpg",
                },
                {
                    imageId: 1,
                    postId: 1,
                    imageUrl: "https://example.com/image1.jpg",
                }
            ],
            category: {
                title: "Adoption"
            },
            user: {
                userId: 1,
                fullName: "Abdallah Abujazar",
                userImage: "https://Abujazar.com/user1.jpg"
            },
            products: [],
            pets: [
                {
                    petId: 1,
                    postId: 1,
                    petName: "Max",
                    type: 1,
                    age: 3,
                    gender: "Male",
                    healthStatus: "Healthy",
                    adoptionStatus: "Available",
                    petType: {
                        title: "Dog"
                    }
                }
            ]
        },
        {
            postId: 3,
            userId: 2,
            categoryId: 1,
            postContent: "Looking to adopt a pet.",
            isHaveImg: false,
            likesCount: 0,
            commentsCount: 0,
            postImages: [],
            category: {
                title: "Adoption"
            },
            user: {
                userId: 2,
                fullName: "Mohammed Sallout",
                userImage: "https://Mohammed.com/user2.jpg"
            },
            products: [],
            pets: [
                {
                    petId: 2,
                    postId: 3,
                    petName: "Bella",
                    type: 2,
                    age: 2,
                    gender: "Female",
                    healthStatus: "Vaccinated",
                    adoptionStatus: "Adopted",
                    petType: {
                        title: "Cat"
                    }
                }
            ]
        },
        {
            postId: 2,
            userId: 2,
            categoryId: 4,
            postContent: "Check out this product Im selling!",
            isHaveImg: true,
            likesCount: 1,
            commentsCount: 1,
            postImages: [
                {
                    imageId: 2,
                    postId: 2,
                    imageUrl: "https://example.com/image2.jpg",
                }
            ],
            category: {
                title: "Sell"
            },
            user: {
                userId: 2,
                fullName: "Mohammed Sallout",
                userImage: "https://Mohammed.com/user2.jpg"
            },
            products: [
                {
                    productId: 1,
                    postId: 2,
                    title: "Product B",
                    price: 14.99,
                    details: "Check out product B.",
                    rating: 3.8,
                }
            ],
            pets: []
        }
    ]
    test('200 | get all explore posts page=1', async () => {
        await request(app)
            .get('/api/v1/posts?page=1')
            .expect(200)
            .expect((res) => {
                expect(res.body.data).toMatchObject(explorePosts)
            })
    })
    test('200 | get all explore posts page=2 that don\'t have posts ', async () => {
        await request(app)
            .get('/api/v1/posts?page=2')
            .expect(200)
            .expect((res) => {
                expect(res.body.data).toEqual([]);
            })
    })
    test('200 | get all explore posts page=ds, It will give default page =1.', async () => {
        await request(app)
            .get('/api/v1/posts?page=ds')
            .expect(200)
            .expect((res) => {
                expect(res.body.data).toHaveLength(3)
            })
    })
})
describe('Test add new post', () => {
    const adoptionPost = {
        categoryId: 1,
        postContent: "This is a adoption post.",
        isHaveImg: true,
        imagesUrl: [
            "test4.png",
            "test5.png"
        ],
        petName: "cat",
        type: 2,
        age: 5,
        gender: "male",
        healthStatus: "IDK",
        adoptionStatus: "IDK"
    }
    const productPost = {
        categoryId: 4,
        postContent: "This is a product post.",
        isHaveImg: true,
        imagesUrl: [
            "test4.png",
            "test5.png"
        ],
        title: "cat toy",
        price: 12,
        details: "toy cat",
        rating: 5
    }
    const productPost2 = {
        postContent: "This is a product post.",
        isHaveImg: true,
        imagesUrl: [
            "test4.png",
            "test5.png"
        ],
        title: "cat toy",
        price: 12,
        details: "toy cat",
        rating: 5
    }
    test('201 | new post of adoption added successfully', async () => {
        await request(app)
            .post("/api/v1/posts")
            .set("cookie", `token=${TOKEN_REGULAR}`)
            .send(adoptionPost)
            .expect(201)
            .expect((res) => {
                expect(res.body.message).toBe("Post created successfully with ID: 4");
                expect(Object.keys(res.body.data)).toHaveLength(3);
            })
    })
    test('201 | new post of product added successfully', async () => {
        await request(app)
            .post("/api/v1/posts")
            .set("cookie", `token=${TOKEN_REGULAR}`)
            .send(productPost)
            .expect(201)
            .expect((res) => {
                expect(res.body.message).toBe("Post created successfully with ID: 5");
                expect(Object.keys(res.body.data)).toHaveLength(3);
            })
    })
    test('400 | post don\'t have category type', async () => {
        await request(app)
            .post("/api/v1/posts")
            .set("cookie", `token=${TOKEN_REGULAR}`)
            .send(productPost2)
            .expect(400)
            .expect((res) => {
                expect(res.body.data.errors).toEqual(["Post Category is required."]);
            })
    })
})

describe('Test update post', () => {
    const adoptionPost = {
        categoryId: 1,
        postContent: "This is a adoption post updated...",
        isHaveImg: false,
        imagesUrl: [
            "test4.png",
            "test5.png"
        ],
        petName: "dog",
        type: 1,
        age: 2,
        gender: "female",
        healthStatus: "IDK",
        adoptionStatus: "IDK"
    }
    test('200 | post updated successfully', async () => {
        await request(app)
            .put("/api/v1/posts/1")
            .set("cookie", `token=${TOKEN_REGULAR}`)
            .send(adoptionPost)
            .expect(200)
            .expect((res) => {
                expect(res.body.message).toBe("Post updated successfully");
                expect(Object.keys(res.body.data)).toHaveLength(3);
            })
    })
    test('400 | trying to update post with string id', async () => {
        await request(app)
            .put("/api/v1/posts/string")
            .set("cookie", `token=${TOKEN_REGULAR}`)
            .send(adoptionPost)
            .expect(400)
            .expect((res) => {
                expect(res.body.message).toBe("Bad Request");
            })
    })
    test('401 | trying to update post of other user.', async () => {
        await request(app)
            .put("/api/v1/posts/2")
            .set("cookie", `token=${TOKEN_REGULAR}`)
            .send(adoptionPost)
            .expect(401)
            .expect((res) => {
                expect(res.body.message).toBe("you are unauthorized to update this post");
            })
    })
    test('400 | trying to update post that dose not exist.', async () => {
        await request(app)
            .put("/api/v1/posts/10000")
            .set("cookie", `token=${TOKEN_REGULAR}`)
            .send(adoptionPost)
            .expect(400)
            .expect((res) => {
                expect(res.body.message).toBe("Bad Request");
            })
    })
})
describe('Test delete post', () => {
    test('200 | post deleted successfully', async () => {
        await request(app)
            .delete("/api/v1/posts/1")
            .set("cookie", `token=${TOKEN_REGULAR}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.message).toBe("Post deleted successfully");
                expect(res.body.postId).toBe(1);
            })
    })
    test('400 | trying to update post with string id', async () => {
        await request(app)
            .delete("/api/v1/posts/string")
            .set("cookie", `token=${TOKEN_REGULAR}`)
            .expect(400)
            .expect((res) => {
                expect(res.body.message).toBe("Bad Request");
            })
    })
    test('401 | trying to delete post of other user.', async () => {
        await request(app)
            .delete("/api/v1/posts/2")
            .set("cookie", `token=${TOKEN_REGULAR}`)
            .expect(401)
            .expect((res) => {
                expect(res.body.message).toBe("you are unauthorized to delete this post");
            })
    })
    test('400 | trying to delete post that dose not exist', async () => {
        await request(app)
            .delete("/api/v1/posts/1000000000")
            .set("cookie", `token=${TOKEN_REGULAR}`)
            .expect(400)
            .expect((res) => {
                expect(res.body.message).toBe("Bad Request");
            })
    })
})

describe('Test get post of user', () => {
    test('200 | get all user posts', async () => {
        await request(app)
            .get("/api/v1/users/1/posts?page=1")
            .expect(200)
            .expect((res) => {
                expect(res.body.data).toHaveLength(2);
            })
    })
    test('200 | No posts for user', async () => {
        await request(app)
            .get("/api/v1/users/1000/posts?page=1")
            .expect(200)
            .expect((res) => {
                expect(res.body.data).toEqual([]);
            })
    })

    test('400 | user Id is a not a string ', async () => {
        await request(app)
            .get("/api/v1/users/string/posts?page=1")
            .expect(400)
            .expect((res) => {
                expect(res.body.message).toBe('Bad Request.');
            })
    })
    test('200 | page is a not a string so it will get a default value page = 1', async () => {
        await request(app)
            .get("/api/v1/users/1/posts?page=string")
            .expect(200)
            .expect((res) => {
                expect(res.body.data).toHaveLength(2);
            })
    })
})