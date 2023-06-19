import * as yup from 'yup'

const validateUserId = yup.object().shape({
  userId: yup.number().positive().required()
})

const validatePostId = yup.object().shape({
  postId: yup.number().positive().required()
})

const validateLikeNum = yup.object().shape({
  userId: yup.number().positive().required(),
  postId: yup.number().positive().required()
})
export { validateUserId, validatePostId, validateLikeNum }
