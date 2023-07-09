import { Card } from 'antd';
import LeftSide from './LeftSide';
import Box from '../commons/Box';

const boxStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100vh',
  margin: 0,
};

const rectangleWrapperStyle: React.CSSProperties = {
  border: 'none',
  height: '1024px',
  width: '337px',
};

const rectangleStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderColor: '#efeff4',
  width: '337px',
};

const LeftSideBox = () => (
  <Box style={boxStyle}>
    <Box style={rectangleWrapperStyle}>
      <Card style={rectangleStyle} bordered={false}>
        <LeftSide />
      </Card>
    </Box>
  </Box>

);

export default LeftSideBox;
