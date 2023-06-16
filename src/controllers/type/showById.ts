import { type Request, type Response, type NextFunction } from 'express'
import { getTypeById } from '../../queries/pettype/showById'
import CustomError from '../../helpers/CustomError'
import { validateTypeId } from '../../validation'

const showTypeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { typeId }: { typeId: number } = await validateTypeId.validate(req.params)

    const type = await getTypeById(Number(typeId))

    if (type != null) {
      res.json({
        data: type
      })
    } else {
      next(new CustomError(404, 'The Type Was Not Found'))
    }
  } catch (err: unknown) {
    next(err)
  }
}

export { showTypeById }
