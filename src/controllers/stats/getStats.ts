import { type Response, type NextFunction } from 'express'
import { getStatsQuery } from '../../queries/'
import { type CustomRequest } from '../../interfaces/iAuth'

const getStats = async (_req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const stats = await getStatsQuery()
    res.json({ data: stats })
  } catch (error) {
    next(error)
  }
}
export default getStats
