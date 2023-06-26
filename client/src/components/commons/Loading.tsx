import Image from './Image';
import Box from './Box';

const Loading: React.FC = () => {
    return (
        <Box className='loading-container'>
            <Image src='/preloader.gif' width='200px' height='150px' className='' alt='loading..' />
        </Box>
    );

}
export default Loading