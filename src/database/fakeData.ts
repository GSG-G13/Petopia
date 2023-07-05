import {
  type IUser, type IPost, type IPostImage, type IComment, type ILike, type IFollower, type IPetType,
  type ICategory, type IProduct, type IPet
} from '../interfaces/fakeDataTypes'

const fakeData: {
  users: IUser[]
  categories: ICategory[]
  comments: IComment[]
  followers: IFollower[]
  likes: ILike[]
  pets: IPet[]
  petTypes: IPetType[]
  posts: IPost[]
  postImages: IPostImage[]
  products: IProduct[]
} = {
  users: [
    {
      fullName: 'Abdallah Abujazar',
      email: 'Abujazar@example.com',
      password: '$2b$10$ruj2Uulvp9I.odC0wsV2wONgt2Nq4mHsAethBzuAcJpOdpVspM/BO',
      userImage: 'https://i.imgur.com/KcYHnFr.jpg',
      profileImage: 'https://i.imgur.com/KcYHnFr.jpg',
      address: '123 Main St, Gaza',
      phone: '123-456-7890',
      userType: 'regular',
      status: 'active',
      followerCount: 1,
      followingCount: 1

    },
    {
      fullName: 'Mohammed Sallout',
      email: 'Mohammed@example.com',
      password: '$2b$10$ruj2Uulvp9I.odC0wsV2wONgt2Nq4mHsAethBzuAcJpOdpVspM/BO',
      userImage: 'https://i.imgur.com/v2v02Ge.jpg',
      profileImage: 'https://i.imgur.com/v2v02Ge.jpg',
      address: '456 Elm St, Khan Younis',
      phone: '987-654-3210',
      userType: 'admin',
      status: 'active',
      followerCount: 2,
      followingCount: 2

    },
    {
      fullName: 'Muhammad Abdulhadi',
      email: 'mu7ammadabed@gmail.com',
      password: '$2b$10$ruj2Uulvp9I.odC0wsV2wONgt2Nq4mHsAethBzuAcJpOdpVspM/BO',
      userImage:
        'https://cdn.discordapp.com/attachments/1113720733860888597/1121405281147027526/IMG_20201207_144829.jpg',
      profileImage:
        'https://cdn.discordapp.com/attachments/1113720733860888597/1121405281147027526/IMG_20201207_144829.jpg',
      address: '456 Elm St, Khan Younis',
      phone: '987-654-3210',
      userType: 'regular',
      status: 'active',
      followerCount: 1,
      followingCount: 1

    }
  ],
  categories: [
    {
      title: 'Adoption'
    },
    {
      title: 'Breed'
    },
    {
      title: 'Post'
    },
    {
      title: 'Sell'
    }
  ],
  comments: [
    {
      userId: 1,
      postId: 1,
      commentText: 'Great post!'
    },
    {
      userId: 2,
      postId: 1,
      commentText: 'Nice work!'
    },
    {
      userId: 1,
      postId: 2,
      commentText: 'Interesting topic.'
    }
  ],
  followers: [
    {
      followingId: 1,
      followerId: 2

    },
    {
      followingId: 3,
      followerId: 2
    },
    {
      followingId: 2,
      followerId: 1
    },
    {
      followingId: 2,
      followerId: 3
    }
  ],
  likes: [
    {
      userId: 1,
      postId: 1
    },
    {
      userId: 2,
      postId: 1
    },
    {
      userId: 1,
      postId: 2
    }
  ],
  pets: [
    {
      postId: 1,
      petName: 'Max',
      type: 1,
      age: 3,
      gender: 'Male',
      healthStatus: 'Healthy',
      adoptionStatus: 'Available'
    },
    {
      postId: 3,
      petName: 'Bella',
      type: 2,
      age: 2,
      gender: 'Female',
      healthStatus: 'Vaccinated',
      adoptionStatus: 'Adopted'
    }
  ],
  petTypes: [
    {
      title: 'Dog'
    },
    {
      title: 'Cat'
    },
    {
      title: 'Bird'
    }
  ],
  posts: [
    {
      userId: 1,
      categoryId: 1,
      postContent: 'This is a regular post.',
      isHaveImg: true,
      likesCount: 2,
      commentsCount: 2

    },
    {
      userId: 1,
      categoryId: 1,
      postContent: 'This is a regular post.',
      isHaveImg: true,
      likesCount: 2,
      commentsCount: 2

    },
    {
      userId: 1,
      categoryId: 1,
      postContent: 'This is a regular post.',
      isHaveImg: true,
      likesCount: 2,
      commentsCount: 2

    }
  ],
  postImages: [
    {
      postId: 1,
      imageUrl: 'https://cdn.discordapp.com/attachments/1113720733860888597/1121405281147027526/IMG_20201207_144829.jpg'
    },
    {
      postId: 2,
      imageUrl: 'https://m.media-amazon.com/images/I/715EiqpJ6XL._AC_SX569_.jpg'
    },
    {
      postId: 1,
      imageUrl: 'https://i.imgur.com/KcYHnFr.jpg'
    },
    {
      postId: 1,
      imageUrl: 'https://i.imgur.com/KcYHnFr.jpg'
    }
  ],
  products: [
    {
      postId: 2,
      title: 'Cat toy',
      price: 14.99,
      details: 'Check out cat toy.',
      rating: 3.8
    }
  ]

}

export default fakeData
