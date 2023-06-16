import { type Request, type Response, type NextFunction } from 'express'
import { getAllTypes } from '../../queries/pettype/showAll'

const showAllTypes = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const types = await getAllTypes()

    res.json({
      data: types
    })
  } catch (error: unknown) {
    next(error)
  }
}

export { showAllTypes }
