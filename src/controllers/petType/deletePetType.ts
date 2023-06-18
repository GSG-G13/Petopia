import { type Request, type Response, type NextFunction } from 'express'
import { deletePetTypeQuery } from '../../queries'
import CustomError from '../../helpers/CustomError'
import { type IPetType } from '../../interfaces/fakeDataTypes'
import { validateTypeId } from '../../validation'

export type { IPetType }

const deletePetType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { typeId }: { typeId: number } = await validateTypeId.validate(req.params)

    const deletedType = await deletePetTypeQuery(Number(typeId))

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

export default deletePetType
