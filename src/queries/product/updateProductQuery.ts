import { type IProduct } from '../../interfaces/fakeDataTypes'
import { Product } from '../../models'

const updateProductQuery = async (postId: number, productData: IProduct): Promise<IProduct> => {
  const [, [updatedProduct]] = await Product.update(
    productData,
    {
      where: { postId },
      returning: true
    }
  )

  return updatedProduct
}
export default updateProductQuery
