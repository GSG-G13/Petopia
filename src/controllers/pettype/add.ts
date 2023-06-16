import { type Request, type Response, type NextFunction } from 'express'
import addType from '../../queries/pettype/add'
import { type IPetType } from '../../interfaces/fakeDataTypes'
import { validateTitle } from '../../validation'

const createType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title }: IPetType = await validateTitle.validate(req.body, { abortEarly: false })

    const newType = await addType(title)

    res.status(201).json({
      message: 'Type Created Successfully',
      data: newType
    })
  } catch (err: unknown) {
    next(err)
  }
}

export { createType }
