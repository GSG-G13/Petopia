const fakeData = {
  users: [
    {
      full_name: 'Abdallah Abujazar',
      email: 'Abujazar@example.com',
      password: 'password123',
      user_image: 'https://Abujazar.com/user1.jpg',
      profile_image: 'https://Abujazar.com/profile1.jpg',
      address: '123 Main St, Gaza',
      phone: '123-456-7890',
      user_type: 'regular',
      status: 'active'
    },
    {
      full_name: 'Mohammed Sallout',
      email: 'Mohammed@example.com',
      password: 'password456',
      user_image: 'https://Mohammed.com/user2.jpg',
      profile_image: 'https://Mohammed.com/profile2.jpg',
      address: '456 Elm St, Khaniones',
      phone: '987-654-3210',
      user_type: 'admin',
      status: 'active'
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
      user_id: 1,
      post_id: 1,
      comment_text: 'Great post!'
    },
    {
      user_id: 2,
      post_id: 1,
      comment_text: 'Nice work!'
    },
    {
      user_id: 1,
      post_id: 2,
      comment_text: 'Interesting topic.'
    }
  ],
  followers: [
    {
      follower_id: 1,
      following_id: 2
    },
    {
      follower_id: 2,
      following_id: 3
    },
    {
      follower_id: 1,
      following_id: 3
    }
  ],
  likes: [
    {
      user_id: 1,
      post_id: 1
    },
    {
      user_id: 2,
      post_id: 1
    },
    {
      user_id: 1,
      post_id: 2
    }
  ],
  pets: [
    {
      post_id: 1,
      pet_name: 'Max',
      pet_type: 1,
      age: 3,
      gender: 'Male',
      health_status: 'Healthy',
      adoption_status: 'Available'
    },
    {
      post_id: 2,
      pet_name: 'Bella',
      pet_type: 2,
      age: 2,
      gender: 'Female',
      health_status: 'Vaccinated',
      adoption_status: 'Adopted'
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
      user_id: 1,
      category_id: 1,
      post_content: 'This is a regular post.',
      is_have_img: false
    },
    {
      user_id: 2,
      category_id: 2,
      post_content: 'Check out this product Im selling!',
      is_have_img: true
    },
    {
      user_id: 3,
      category_id: 1,
      post_content: 'Looking to adopt a pet.',
      is_have_img: false
    }
  ],
  postImages: [
    {
      post_id: 1,
      image_url: 'https://example.com/image1.jpg'
    },
    {
      post_id: 2,
      image_url: 'https://example.com/image2.jpg'
    },
    {
      post_id: 1,
      image_url: 'https://example.com/image3.jpg'
    }
  ],
  products: [
    {
      post_id: 1,
      title: 'Product A',
      price: 9.99,
      details: 'This is product A.',
      rating: 4.5
    },
    {
      post_id: 2,
      title: 'Product B',
      price: 14.99,
      details: 'Check out product B.',
      rating: 3.8
    },
    {
      post_id: 3,
      title: 'Product C',
      price: 19.99,
      details: 'Introducing product C.',
      rating: 4.2
    }
  ]

}

export default fakeData
