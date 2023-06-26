import { Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Box from './Box';
import Image from './Image';

const PageNotFound: React.FC = () => {
  const { Title } = Typography;
  const navigate = useNavigate();
  return (
    <Box className="error-container">
      <Image src="/notFound.gif" width="600px" height="500px" className="" alt="not found" />
      <Title level={2} className="error-404">404 Page Not Found</Title>
      <Button type="primary" className="button" onClick={() => { navigate('/'); }}>Back To Home</Button>
    </Box>
  );
};
export default PageNotFound;
