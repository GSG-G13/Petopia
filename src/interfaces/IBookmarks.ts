import { type IBookmarks, type IPet, type IPostImage, type IProduct } from './models'

interface IPetWithTypeName extends IPet {
  petType: {
    'title': string
  }
}

interface IBookmarksWithPosts extends IBookmarks {
  postImages?: IPostImage[]
  likeCount?: number
  commentCount?: number
  user?: {
    userId: number
    fullName: string
    userImage: string
  }
  category?: { title: string }
  products?: IProduct[]
  pets?: IPetWithTypeName[]
}
export type { IBookmarksWithPosts }
