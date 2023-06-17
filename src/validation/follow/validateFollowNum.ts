import * as yup from 'yup'

const validateFollowNum = yup.object().shape({
  followerId: yup.number().positive().required(),
  followingId: yup.number().positive().required()
})

export default validateFollowNum
