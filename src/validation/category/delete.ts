import * as yup from 'yup'

const deleteCategoryValidation = yup.object().shape({
  categoryId: yup.number().positive().required()
})

export default deleteCategoryValidation
