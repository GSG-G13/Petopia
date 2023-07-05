import { Layout, Card } from 'antd';
import LeftSide from './LeftSide';

const { Sider } = Layout;

const boxStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%',
  height: '100vh',
};

const rectangleWrapperStyle: React.CSSProperties = {
  border: 'none',
  height: '1024px',
  width: '337px',
};

const rectangleStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderColor: '#efeff4',
  borderLeftStyle: 'solid',
  borderLeftWidth: '1px',
  width: '337px',
};

const LeftSideBox = () => (
  <div style={boxStyle}>
    <div style={rectangleWrapperStyle}>
      <Card style={rectangleStyle} bordered={false}>
        <LeftSide />
      </Card>

    </div>
  </div>

);

export default LeftSideBox;
