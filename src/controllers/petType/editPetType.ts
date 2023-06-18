import { type Request, type Response, type NextFunction } from 'express'
import { editPetTypeQuery } from '../../queries'
import { type IPetType } from '../../interfaces/models'
import CustomError from '../../helpers/CustomError'
import { validateTypeId, validateTitle } from '../../validation'

const editPetType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { typeId }: { typeId: number } = await validateTypeId.validate(req.params)

    const { title }: { title: string } = await validateTitle.validate(req.body, { abortEarly: false })

    const updatedType: IPetType | null = await editPetTypeQuery(Number(typeId), title)

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

export default editPetType
