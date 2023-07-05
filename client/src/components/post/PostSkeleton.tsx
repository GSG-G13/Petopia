import { Skeleton } from 'antd';
import Box from '../commons/Box';

const PostSkeleton:React.FC = () => (
  <Box className="card" style={{ margin: '15px', padding: '15px' }}>
    <Box className="user-post-container">
      <Skeleton.Avatar active size="large" shape="circle" />
      <Skeleton active paragraph={{ rows: 0 }} />
    </Box>
    <Skeleton.Image
      active
      style={{
        width: '400px',
        height: '200px',
        lineHeight: '160px',
        borderRadius: '20px',
        objectFit: 'contain',
      }}
    />
    <Skeleton active paragraph={{ rows: 3 }} className="post-content" />
    <Box className="comment">
      <Skeleton.Avatar active size="large" shape="circle" />
      <Skeleton.Input active size="large" block style={{ width: '470px', borderRadius: '20px' }} />
    </Box>
  </Box>
);
export default PostSkeleton;
