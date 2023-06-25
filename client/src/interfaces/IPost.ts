interface IPost {
    postId: number
    userId: number
    categoryId: number
    postContent: string
    isHaveImg: boolean
    likesCount: number
    commentsCount: number
    createdAt: string
    updatedAt?: string
    postImages?: {
        imageId: number
        postId: number
        imageUrl: string
        createdAt: string
        updatedAt: string
    }[]
    category: {
        title: string
    }
    user: {
        userId: number
        fullName: string
        userImage: string
        phoneNumber: number
    }
    products: {
        productId: number
        postId: number
        title: string
        price: number
        details: string
        rating: number
        createdAt: string
        updatedAt: string
    }[]
    pets: {
        petId: number
        petName: string
        age: number
        gender: string
        healthStatus: string
        adoptionStatus: string
        petType: {
            typeId: number,
            title: string
        }
    }[]
}

export default IPost