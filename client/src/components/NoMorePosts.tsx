import { Typography } from 'antd';
import { HomeFilled } from '@ant-design/icons';
import Box from './commons/Box';

import '../styles/NoMorePosts.css';

const { Title } = Typography;

const NoMorePosts = () => (
  <Box className="NoMorePosts--container">
    <HomeFilled className="NoMorePosts--icon" />
    <Title level={4} className="NoMorePosts--title" style={{ color: '#61696D' }}>
      Looks like you&apos;ve reached the end
    </Title>
  </Box>
);

export default NoMorePosts;
