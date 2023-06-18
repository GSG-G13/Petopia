import { number, object } from 'yup'

const validateCommentId = object({
  commentId: number().positive().required()
})

export default validateCommentId
