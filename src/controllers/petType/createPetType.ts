import { type Request, type Response, type NextFunction } from 'express'
import { createPetTypeQuery } from '../../queries'
import { type IPetType } from '../../interfaces/fakeDataTypes'
import { validateTitle } from '../../validation'

const createPetType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title }: IPetType = await validateTitle.validate(req.body, { abortEarly: false })

    const newType = await createPetTypeQuery(title)

    res.status(201).json({
      message: 'Type Created Successfully',
      data: newType
    })
  } catch (err: unknown) {
    next(err)
  }
}

export default createPetType
