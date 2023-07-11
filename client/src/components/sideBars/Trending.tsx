import { Row, Col, Typography, Image } from 'antd';

const { Title } = Typography;

const Trending = (): JSX.Element => {
  return (
    <Row justify="center">
      <Col span={24}>
        <Title level={4} style={{marginTop:40, marginBottom:16}}>Trending Products</Title>
        <Row gutter={16} style={{marginBottom: 16}}>
          <Col span={12}>
            <Image width={130} height={100} style={{borderRadius: 8}} src="https://media.discordapp.net/attachments/1112051630985187378/1122439026163601531/5308de68ed17c97ce5e45cef8f648dbb.png?width=320&height=320" />
          </Col>
          <Col span={12}>
            <Image width={130} height={100} style={{borderRadius: 8}} src="https://media.discordapp.net/attachments/1112051630985187378/1122439026390073394/38308a08c26e275d9560bcbabeb74324.png?width=320&height=320" />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Image width={130} height={100} style={{borderRadius: 8}} src="https://media.discordapp.net/attachments/1112051630985187378/1122439026599796767/6a408186a8530cf9d4cf4178f616760f.png?width=320&height=320" />
          </Col>
          <Col span={12}>
            <Image width={130} height={100} style={{borderRadius: 8}} src="https://media.discordapp.net/attachments/1112051630985187378/1122439026834690158/d458801094a448d2f6606da3167845ad.png?width=320&height=320" />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Trending;
