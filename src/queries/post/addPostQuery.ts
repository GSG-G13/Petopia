// import sequelize from 'sequelize'
// import { type IPost } from '../../interfaces/models'
// import { Post } from '../../models'

// interface postData {
//   category_id: number
//   post_content: string
//   is_have_img: boolean
// }
// const addPostQuery = async (_userId: number,postData: postData , imageUrls: string[]): Promise<IPost> => {
//   const { userId, category_id, post_content, is_have_img, image_url } = data
//   const transaction = await sequelize.transaction()
//   try{
//     const post = await Post.create(postData, { transaction });
//   }
// }
