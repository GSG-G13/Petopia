import * as yup from 'yup'

const validateFollowerId = yup.object().shape({
  followerId: yup.number().positive().required()
})

const validateFollowingId = yup.object().shape({
  followingId: yup.number().positive().required()
})

const validateFollowNum = yup.object().shape({
  followerId: yup.number().positive().required(),
  followingId: yup.number().positive().required()
})
export { validateFollowingId, validateFollowerId, validateFollowNum }
