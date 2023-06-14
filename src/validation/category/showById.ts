import * as yup from 'yup'

const byIdValidation = yup.object().shape({
  categoryId: yup.number().required()
})

export default byIdValidation
