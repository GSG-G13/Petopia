import { type Request, type Response, type NextFunction } from 'express'
import { deletePetType } from '../../queries/pettype/delete'
import CustomError from '../../helpers/CustomError'
import { type IPetType } from '../../interfaces/fakeDataTypes'
import { validateTypeId } from '../../validation'

export type { IPetType }

const deleteType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { typeId }: { typeId: number } = await validateTypeId.validate(req.params)

    const deletedType = await deletePetType(Number(typeId))

    if (deletedType) {
      res.json({
        message: 'Type Deleted Successfully',
        data: deletedType
      })
    } else {
      throw new CustomError(400, 'The Type Was Not Found')
    }
  } catch (err: unknown) {
    next(err)
  }
}

export { deleteType }
