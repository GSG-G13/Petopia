import * as yup from 'yup'

const validateUserId = yup.object().shape({
  userId: yup.number().positive().required()
})

export default validateUserId
