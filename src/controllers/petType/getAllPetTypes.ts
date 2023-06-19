import { type Request, type Response, type NextFunction } from 'express'
import { getAllPetTypesQuery } from '../../queries'

const getAllPetTypes = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const types = await getAllPetTypesQuery()

    res.json({
      data: types
    })
  } catch (error: unknown) {
    next(error)
  }
}

export default getAllPetTypes
