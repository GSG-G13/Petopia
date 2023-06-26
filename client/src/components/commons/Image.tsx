import { Image } from 'antd';

interface Props {
    src: string
    width: string
    height: string
    className: string
    alt: string
}
const ImageComponent: React.FC<Props> = (props) => (
    <Image
        preview={false}
        {...props}
    />
);
export default ImageComponent;