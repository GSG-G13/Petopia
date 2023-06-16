import { type Request, type Response, type NextFunction } from 'express'
import { editPetType } from '../../queries/pettype/edit'
import { type IPetType } from '../../interfaces/models'
import CustomError from '../../helpers/CustomError'
import { validateTypeId, validateTitle } from '../../validation'

const updateType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { typeId }: { typeId: number } = await validateTypeId.validate(req.params)

    const { title }: { title: string } = await validateTitle.validate(req.body, { abortEarly: false })

    const updatedType: IPetType | null = await editPetType(Number(typeId), title)

    if (updatedType != null) {
      res.json({
        message: 'Type Updated Successfully',
        data: updatedType
      })
    } else {
      throw new CustomError(400, 'The Type Was Not Found')
    }
  } catch (err: unknown) {
    next(err)
  }
}

export { updateType }
