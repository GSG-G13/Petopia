import { number, object } from 'yup'

const deleteCommentSchema = object({
  commentId: number().required()
})

export { deleteCommentSchema }
