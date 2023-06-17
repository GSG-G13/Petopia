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
      userImage: 'https://Abujazar.com/user1.jpg',
      profileImage: 'https://Abujazar.com/profile1.jpg',
      address: '123 Main St, Gaza',
      phone: '123-456-7890',
      userType: 'regular',
      status: 'active',
      followerCount: 0,
      followingCount: 0

    },
    {
      fullName: 'Mohammed Sallout',
      email: 'Mohammed@example.com',
      password: '$2b$10$J2ZP4xc/Yug8q1Gs7F8vL.rZbskXD2FyRf7iidzdDqD9ewYW4sLFG',
      userImage: 'https://Mohammed.com/user2.jpg',
      profileImage: 'https://Mohammed.com/profile2.jpg',
      address: '456 Elm St, Khaniones',
      phone: '987-654-3210',
      userType: 'regular',
      status: 'active',
      followerCount: 2,
      followingCount: 2

    },
    {
      fullName: 'Muhammad Abdulhadi',
      email: 'mu7ammadabed@gmail.com',
      password: '$2b$10$ruj2Uulvp9I.odC0wsV2wONgt2Nq4mHsAethBzuAcJpOdpVspM/BO',
      userImage: 'https://Mohammed.com/user2.jpg',
      profileImage: 'https://Mohammed.com/profile2.jpg',
      address: '456 Elm St, Khaniones',
      phone: '987-654-3210',
      status: 'active',
      followerCount: 0,
      followingCount: 0

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
      followerId: 1,
      followingId: 2

    },
    {
      followerId: 3,
      followingId: 2
    },
    {
      followerId: 2,
      followingId: 1
    },
    {
      followerId: 2,
      followingId: 3
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
      petType: 1,
      age: 3,
      gender: 'Male',
      healthStatus: 'Healthy',
      adoptionStatus: 'Available'
    },
    {
      postId: 2,
      petName: 'Bella',
      petType: 2,
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
      isHaveImg: true
    },
    {
      userId: 2,
      categoryId: 2,
      postContent: 'Check out this product Im selling!',
      isHaveImg: true
    },
    {
      userId: 2,
      categoryId: 1,
      postContent: 'Looking to adopt a pet.',
      isHaveImg: false
    }
  ],
  postImages: [
    {
      postId: 1,
      imageUrl: 'https://example.com/image1.jpg'
    },
    {
      postId: 2,
      imageUrl: 'https://example.com/image2.jpg'
    },
    {
      postId: 1,
      imageUrl: 'https://example.com/image3.jpg'
    }
  ],
  products: [
    {
      postId: 1,
      title: 'Product A',
      price: 9.99,
      details: 'This is product A.',
      rating: 4.5
    },
    {
      postId: 2,
      title: 'Product B',
      price: 14.99,
      details: 'Check out product B.',
      rating: 3.8
    },
    {
      postId: 3,
      title: 'Product C',
      price: 19.99,
      details: 'Introducing product C.',
      rating: 4.2
    }
  ]

}

export default fakeData
