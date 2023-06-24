import { Carousel } from "antd"
import Image from "./Image"
interface Props {
    images: {
        imageId: number,
        postId: number,
        imageUrl: string,
        createdAt: string,
        updatedAt: string
    }[]
}
const CarouselComponent: React.FC<Props> = ({ images }) => {

    const Images = (images !== null && images !== undefined) ? images.map(
        (image, index) => <Image key={index} src={image.imageUrl} height={'315px'} width={'532px'} className="img" />) : []
    return (
        <Carousel className='carousel' >
            {Images}
        </Carousel>
    )
}
export default CarouselComponent