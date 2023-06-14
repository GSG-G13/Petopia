import * as yup from 'yup'

const editTitleValidation = yup.object().shape({
  title: yup.string().required().trim()
})

const editIDValidation = yup.object().shape({
  categoryId: yup.number().required()
})
export { editIDValidation, editTitleValidation }
 