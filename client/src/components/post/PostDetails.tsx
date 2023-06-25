import {
  Col, Collapse, CollapseProps, Row,
} from 'antd';
import Paragraph from '../commons/Paragraph';
import Box from '../commons/Box';

interface Props {
  petDetails?:{
    petId: number,
    petName: string,
    age: number,
    gender: string,
    healthStatus: string,
    adoptionStatus: string,
    petType: {
      typeId: number,
      title: string
    }
  }
  productDetails?: {
    productId: number,
    postId: number,
    title: string,
    price: number,
    details: string,
    rating: number
  }
}

const PostDetails: React.FC<Props> = ({ petDetails, productDetails }) => {
  let details = <Box />;
  if (petDetails !== undefined && petDetails !== null) {
    details = (
      <>
        <Row>
          <Col span={12} className="collapse-details">
            <Paragraph>
              Name:
              {' '}
              {petDetails.petName}
            </Paragraph>
          </Col>
          <Col span={12} className="collapse-details">
            <Paragraph>
              Age:
              {' '}
              {petDetails.age}
            </Paragraph>
          </Col>
        </Row>
        <Row>
          <Col span={12} className="collapse-details">
            <Paragraph>
              Gender:
              {' '}
              {petDetails.gender}
            </Paragraph>
          </Col>
          <Col span={12} className="collapse-details">
            <Paragraph>
              PetType:
              {' '}
              {petDetails.petType.title}
            </Paragraph>
          </Col>
        </Row>
        <Row>
          <Col span={12} className="collapse-details">
            <Paragraph>
              HealthStatus:
              {' '}
              {petDetails.healthStatus}
            </Paragraph>
          </Col>
          <Col span={12} className="collapse-details">
            <Paragraph>
              AdoptionStatus:
              {' '}
              {petDetails.adoptionStatus}
            </Paragraph>
          </Col>
        </Row>
      </>
    );
  } else if (productDetails !== undefined && productDetails !== null) {
    details = (
      <>
        <Row>
          <Col span={12} className="collapse-details">
            <Paragraph>
              Name:
              {' '}
              {productDetails?.title}
            </Paragraph>
          </Col>
          <Col span={12} className="collapse-details">
            <Paragraph>
              Price:
              {' '}
              {productDetails?.price}
            </Paragraph>
          </Col>
        </Row>
        <Row>
          <Col span={12} className="collapse-details">
            <Paragraph>
              Details:
              {' '}
              {productDetails?.details}
            </Paragraph>
          </Col>
          <Col span={12} className="collapse-details">
            <Paragraph>
              Rating:
              {' '}
              {productDetails?.rating}
            </Paragraph>
          </Col>
        </Row>
      </>
    );
  }
  let label = '';
  if (petDetails !== undefined) {
    label = 'Pet Details';
  } else if (productDetails !== undefined) {
    label = 'Product Details';
  }
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <Box>{label}</Box>,
      className: 'collapse-details',
      children: <Box>{ details }</Box>,
    },
  ];
  return (
    petDetails !== undefined || productDetails !== undefined
      ? (
        <Collapse
          defaultActiveKey={['0']}
          ghost
          items={items}
        />
      ) : <Box />
  );
};
export default PostDetails;
