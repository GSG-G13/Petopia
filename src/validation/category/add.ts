import * as yup from 'yup'

const createCategoryValidation = yup.object().shape({
  title: yup.string().required('Title is required')
})

export default createCategoryValidation
 