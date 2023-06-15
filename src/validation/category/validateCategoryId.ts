import * as yup from 'yup'

const validateCategoryId = yup.object().shape({
  categoryId: yup.number().positive().required()
})

export default validateCategoryId
