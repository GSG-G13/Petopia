import Box from './Box';
import Image from './Image';

const Loading: React.FC = () => (
  <Box className="loading-container">
    <Image src="/preloader.gif" width="200px" height="150px" className="" alt="loading.." />
  </Box>
);
export default Loading;
