import * as yup from 'yup'

const deleteCategoryValidation = yup.object().shape({
  categoryId: yup.number().required()
})

export default deleteCategoryValidation
 