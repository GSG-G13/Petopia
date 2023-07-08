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
                    imageUrl: "https://cdn.discordapp.com/attachments/1113720733860888597/1121405281147027526/IMG_20201207_144829.jpg",
                },
                {
                    imageId: 3,
                    postId: 1,
                    imageUrl: "https://i.imgur.com/KcYHnFr.jpg",
                },
                {
                    imageId: 4,
                    imageUrl: "https://i.imgur.com/KcYHnFr.jpg",
                    postId: 1
                }
            ],
            category: {
                title: "Adoption"
            },
            user: {
                userId: 1,
                fullName: "Abdallah Abujazar",
                userImage: "https://i.imgur.com/KcYHnFr.jpg"
            },
            products: [],
            pets: [
                {
                    petId: 1,
                    petName: "Max",
                    age: 3,
                    gender: "Male",
                    healthStatus: "Healthy",
                    adoptionStatus: "Available",
                    petType: {
                        typeId: 1,
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
                userImage: "https://i.imgur.com/v2v02Ge.jpg"
            },
            products: [],
            pets: [
                {
                    petId: 2,
                    petName: "Bella",
                    age: 2,
                    gender: "Female",
                    healthStatus: "Vaccinated",
                    adoptionStatus: "Adopted",
                    petType: {
                        typeId: 2,
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
                    imageUrl: "https://m.media-amazon.com/images/I/715EiqpJ6XL._AC_SX569_.jpg",
                }
            ],
            category: {
                title: "Sell"
            },
            user: {
                userId: 2,
                fullName: "Mohammed Sallout",
                userImage: "https://i.imgur.com/v2v02Ge.jpg"
            },
            products: [
                {
                    productId: 1,
                    postId: 2,
                    title: "Cat toy",
                    price: 14.99,
                    details: "Check out cat toy.",
                    rating: 3.8,
                }
            ],
            pets: []
        },
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
                    imageId: 1,
                    postId: 1,
                    imageUrl: "https://cdn.discordapp.com/attachments/1113720733860888597/1121405281147027526/IMG_20201207_144829.jpg",
                },
                {
                    imageId: 3,
                    postId: 1,
                    imageUrl: "https://i.imgur.com/KcYHnFr.jpg",
                },
                {
                    imageId: 4,
                    imageUrl: "https://i.imgur.com/KcYHnFr.jpg",
                    postId: 1
                }
            ],
            category: {
                title: "Adoption"
            },
            user: {
                userId: 1,
                fullName: "Abdallah Abujazar",
                userImage: "https://i.imgur.com/KcYHnFr.jpg"
            },
            products: [],
            pets: [
                {
                    petId: 1,
                    petName: "Max",
                    age: 3,
                    gender: "Male",
                    healthStatus: "Healthy",
                    adoptionStatus: "Available",
                    petType: {
                        typeId: 1,
                        title: "Dog"
                    }
                }
            ]
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

describe('Test Get feed posts for userId = 1 which is following userId = 2', () => {
    const feedPosts = [
        {
            "postId": 5,
            "userId": 1,
            "categoryId": 4,
            "postContent": "This is a product post.",
            "isHaveImg": true,
            "likesCount": 0,
            "commentsCount": 0,
            "postImages": [
                {
                    "imageId": 7,
                    "imageUrl": "test4.png",
                    "postId": 5,
                }, {
                    "imageId": 8,
                    "imageUrl": "test5.png",
                    "postId": 5,
                }
            ],
            "category": {
                "title": "Sell"
            },
            "user": {
                "fullName": "Abdallah Abujazar",
                "phone": "123-456-7890",
                "userId": 1,
                "userImage": "https://i.imgur.com/KcYHnFr.jpg",
            },
            "products": [
                {
                    "productId": 2,
                    "postId": 5,
                    "title": "cat toy",
                    "price": 12,
                    "details": "toy cat",
                    "rating": 5,
                }
            ],
            "pets": []
        },
        {
            "postId": 4,
            "userId": 1,
            "categoryId": 1,
            "postContent": "This is a adoption post.",
            "isHaveImg": true,
            "likesCount": 0,
            "commentsCount": 0,
            "postImages": [
                {
                    "imageId": 5,
                    "postId": 4,
                    "imageUrl": "test4.png",
                },
                {
                    "imageId": 6,
                    "postId": 4,
                    "imageUrl": "test5.png",
                }
            ],
            "category": {
                "title": "Adoption"
            },
            "user": {
                "userId": 1,
                "fullName": "Abdallah Abujazar",
                "userImage": "https://i.imgur.com/KcYHnFr.jpg",
                "phone": "123-456-7890"
            },
            "products": [],
            "pets": [
                {
                    "petId": 3,
                    "petName": "cat",
                    "age": 5,
                    "gender": "male",
                    "healthStatus": "IDK",
                    "adoptionStatus": "IDK",
                    "petType": {
                        "typeId": 2,
                        "title": "Cat"
                    }
                }
            ]
        },
        {
            "postId": 3,
            "userId": 2,
            "categoryId": 1,
            "postContent": "Looking to adopt a pet.",
            "isHaveImg": false,
            "likesCount": 0,
            "commentsCount": 0,
            "postImages": [],
            "category": {
                "title": "Adoption"
            },
            "user": {
                "userId": 2,
                "fullName": "Mohammed Sallout",
                "userImage": "https://i.imgur.com/v2v02Ge.jpg",
                "phone": "987-654-3210"
            },
            "products": [],
            "pets": [
                {
                    "petId": 2,
                    "petName": "Bella",
                    "age": 2,
                    "gender": "Female",
                    "healthStatus": "Vaccinated",
                    "adoptionStatus": "Adopted",
                    "petType": {
                        "typeId": 2,
                        "title": "Cat"
                    }
                }
            ]
        },
        {
            "postId": 2,
            "userId": 2,
            "categoryId": 4,
            "postContent": "Check out this product Im selling!",
            "isHaveImg": true,
            "likesCount": 1,
            "commentsCount": 1,
            "postImages": [
                {
                    "imageId": 2,
                    "postId": 2,
                    "imageUrl": "https://m.media-amazon.com/images/I/715EiqpJ6XL._AC_SX569_.jpg",
                }
            ],
            "category": {
                "title": "Sell"
            },
            "user": {
                "userId": 2,
                "fullName": "Mohammed Sallout",
                "userImage": "https://i.imgur.com/v2v02Ge.jpg",
                "phone": "987-654-3210"
            },
            "products": [
                {
                    "productId": 1,
                    "postId": 2,
                    "title": "Cat toy",
                    "price": 14.99,
                    "details": "Check out cat toy.",
                    "rating": 3.8,
                }
            ],
            "pets": []
        }
        // ,
        // {
        //     "postId": 1,
        //     "userId": 1,
        //     "categoryId": 1,
        //     "postContent": "This is a regular post.",
        //     "isHaveImg": true,
        //     "likesCount": 2,
        //     "commentsCount": 2,
        //     "postImages": [
        //         {
        //             "imageId": 1,
        //             "postId": 1,
        //             "imageUrl": "https://cdn.discordapp.com/attachments/1113720733860888597/1121405281147027526/IMG_20201207_144829.jpg",
        //         },
        //         {
        //             "imageId": 3,
        //             "postId": 1,
        //             "imageUrl": "https://i.imgur.com/KcYHnFr.jpg",
        //         },
        //         {
        //             "imageId": 4,
        //             "postId": 1,
        //             "imageUrl": "https://i.imgur.com/KcYHnFr.jpg",
        //         }
        //     ],
        //     "category": {
        //         "title": "Adoption"
        //     },
        //     "user": {
        //         "userId": 1,
        //         "fullName": "Abdallah Abujazar",
        //         "userImage": "https://i.imgur.com/KcYHnFr.jpg",
        //         "phone": "123-456-7890"
        //     },
        //     "products": [],
        //     "pets": [
        //         {
        //             "petId": 1,
        //             "petName": "Max",
        //             "age": 3,
        //             "gender": "Male",
        //             "healthStatus": "Healthy",
        //             "adoptionStatus": "Available",
        //             "petType": {
        //                 "typeId": 1,
        //                 "title": "Dog"
        //             }
        //         }
        //     ]
        // }
    ]
    test('200 | get all explore posts page=1', async () => {
        await request(app)
            .get('/api/v1/posts/feed?page=1')
            .set("cookie", `token=${TOKEN_REGULAR}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.data).toMatchObject(feedPosts)
                expect(res.body.data).toHaveLength(4)
            })
    })
    test('200 | get all feed posts page=2 that don\'t have posts ', async () => {
        await request(app)
            .get('/api/v1/posts/feed?page=2')
            .set("cookie", `token=${TOKEN_REGULAR}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.data).toEqual([]);
            })
    })
    test('200 | get all feed posts page=ds, It will give default page =1.', async () => {
        await request(app)
            .get('/api/v1/posts/feed?page=ds')
            .set("cookie", `token=${TOKEN_REGULAR}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.data).toHaveLength(4)
            })
    })
})