import * as yup from 'yup'

const validateStatus = yup.object().shape({
  status: yup.string().oneOf(['active', 'deactive']).required()
})

export default validateStatus
