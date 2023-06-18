import { object, string } from 'yup'

const commentSchema = object({
  commentText: string().trim().required()
})

export default commentSchema
