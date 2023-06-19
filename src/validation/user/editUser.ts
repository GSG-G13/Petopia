import * as yup from 'yup'

const validateEditUser = yup.object().shape({
  userId: yup.number().required(),
  fullName: yup.number().required('Post Category is required.'),
  email: yup.string().required('Content is required.'),
  password: yup.string().required('Content is required.'),
  userImage: yup.string().required('Content is required.'),
  profileImage: yup.string().required('Content is required.'),
  address: yup.string().required('Content is required.'),
  phone: yup.string().required('Content is required.')
})

export default validateEditUser
