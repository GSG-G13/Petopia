import * as yup from 'yup'

const validateStatus = yup.object().shape({
  status: yup.string().oneOf(['active', 'deactive']).required()
})

const validateFullName = yup.object().shape({
  fullName: yup.string().required('Full Name is required')
})

export { validateStatus, validateFullName }
