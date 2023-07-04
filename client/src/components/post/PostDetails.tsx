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
            <Paragraph className="description-div">
              Name:
              {' '}

              <Paragraph className="description">
                {petDetails.petName}
                {' '}
              </Paragraph>
            </Paragraph>
          </Col>
          <Col span={12} className="collapse-details">
            <Paragraph className="description-div">
              Age:
              {' '}
              <Paragraph className="description">
                {petDetails.age}
              </Paragraph>
            </Paragraph>
          </Col>
        </Row>
        <Row>
          <Col span={12} className="collapse-details">
            <Paragraph className="description-div">
              Gender:
              {' '}
              <Paragraph className="description">
                {petDetails.gender}
              </Paragraph>
            </Paragraph>
          </Col>
          <Col span={12} className="collapse-details">
            <Paragraph className="description-div">
              Pet Type:
              {' '}
              <Paragraph className="description">
                {petDetails.petType.title}
              </Paragraph>
            </Paragraph>
          </Col>
        </Row>
        <Row>
          <Col span={12} className="collapse-details">
            <Paragraph className="description-div">
              Health Status:
              {' '}
              <Paragraph className="description">
                {petDetails.healthStatus}
              </Paragraph>
            </Paragraph>
          </Col>
          <Col span={12} className="collapse-details">
            <Paragraph className="description-div">
              Adoption Status:
              {' '}
              <Paragraph className="description">
                {petDetails.adoptionStatus}
              </Paragraph>
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
            <Paragraph className="description-div">
              Name:
              {' '}
              <Paragraph className="description">
                {productDetails?.title}
              </Paragraph>
            </Paragraph>
          </Col>
          <Col span={12} className="collapse-details">
            <Paragraph className="description-div">
              Price:
              {' '}
              <Paragraph className="description">
                {productDetails?.price}
              </Paragraph>
            </Paragraph>
          </Col>
        </Row>
        <Row>
          <Col span={12} className="collapse-details">
            <Paragraph className="description-div">
              Details:
              {' '}
              <Paragraph className="description">
                {productDetails?.details}
              </Paragraph>
            </Paragraph>
          </Col>
          <Col span={12} className="collapse-details">
            <Paragraph className="description-div">
              Rating:
              {' '}
              <Paragraph className="description">
                {productDetails?.rating}
              </Paragraph>
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
