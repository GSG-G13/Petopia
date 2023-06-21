import * as yup from 'yup'

const validateEditUser = yup.object().shape({
  fullName: yup.string().required('fullName is required.'),
  email: yup.string().email('Email is Invalid').required('email is required.'),
  password: yup.string().required('password is required.'),
  userImage: yup.string().required('userImage is required.'),
  profileImage: yup.string().required('profileImage is required.'),
  address: yup.string().required('address is required.'),
  phone: yup.string().min(7).required('phone is required.')
})

export default validateEditUser
