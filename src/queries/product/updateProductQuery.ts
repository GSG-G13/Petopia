import { type IProduct } from '../../interfaces/fakeDataTypes'
import { Product } from '../../models'

const updateProductQuery = async (postId: number, productData: IProduct): Promise<IProduct | null> => {
  const [count, [updatedProduct]] = await Product.update(
    { ...productData },
    {
      where: { postId },
      returning: true
    }
  )
  if (count === 0) {
    return null
  }
  return updatedProduct
}
export default updateProductQuery
