import { Image } from 'antd';

interface Props {
    src: string
    width: string
    height: string
    className: string
}
const ImageComponent: React.FC<Props> = ({ src, width, height, className }) => {

    return (
        <div>
            <Image
                className={className}
                width={width}
                height={height}
                preview={false}
                src={src}
            />
        </div>
    )
}
export default ImageComponent