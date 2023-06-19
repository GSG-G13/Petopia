import * as yup from 'yup'

const validateTypeId = yup.object().shape({
  typeId: yup.number().positive().required()
})

export default validateTypeId
