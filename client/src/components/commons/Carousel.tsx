// import { Carousel } from "antd"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const Images = (images !== null && images !== undefined) ? images.map(
        (image, index) => <Image key={index} src={image.imageUrl} height={'315px'} width={'532px'} className="img" alt={'postImage' + index} />) : []
    return (
        <Slider {...settings} className='carousel' >
            {Images}
        </Slider>
    )
}
export default CarouselComponent