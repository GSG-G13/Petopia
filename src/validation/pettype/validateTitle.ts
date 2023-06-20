import * as yup from 'yup'

const validateTitle = yup.object().shape({
  title: yup.string().required('Title is required').trim()
})

export default validateTitle
