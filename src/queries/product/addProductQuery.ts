import { type IProduct } from '../../interfaces/fakeDataTypes'
import { Product } from '../../models'

const addProductQuery = async (productData: IProduct): Promise<IProduct> => {
  const product = await Product.create(
    { ...productData }
  )
  return product
}
export default addProductQuery
