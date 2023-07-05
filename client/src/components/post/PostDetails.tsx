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

const DetailsRow: React.FC<{ label: string; value: string | number;
  label2:string; value2:string | number }> = ({
  label, value, label2, value2,
}) => (
  <Row>
    <Col span={12} className="collapse-details">
      <Paragraph className="description-div">
        {label}
        :
        {' '}
        <Paragraph className="description">
          {value}
        </Paragraph>
      </Paragraph>
    </Col>
    <Col span={12} className="collapse-details">
      <Paragraph className="description-div">
        {label2}
        :
        {' '}
        <Paragraph className="description">
          {value2}
        </Paragraph>
      </Paragraph>
    </Col>
  </Row>
);

const PostDetails: React.FC<Props> = ({ petDetails, productDetails }) => {
  let details = <Box />;
  let label = '';

  if (petDetails !== undefined && petDetails !== null) {
    label = 'Pet Details';
    details = (
      <>
        <DetailsRow label="Name" value={petDetails.petName} label2="Age" value2={petDetails.age} />
        <DetailsRow label="Gender" value={petDetails.gender} label2="Pet Type" value2={petDetails.petType.title} />
        <DetailsRow
          label="Health Status"
          value={petDetails.healthStatus}
          label2="Adoption Status"
          value2={petDetails.adoptionStatus}
        />
      </>
    );
  } else if (productDetails !== undefined && productDetails !== null) {
    label = 'Product Details';
    details = (
      <>
        <DetailsRow label="Name" value={productDetails?.title} label2="Price" value2={productDetails?.price} />
        <DetailsRow label="Details" value={productDetails?.details} label2="Rating" value2={productDetails?.rating} />
      </>
    );
  }

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <Box>{label}</Box>,
      className: 'collapse-details',
      children: <Box>{details}</Box>,
    },
  ];

  return (
    (petDetails !== undefined || productDetails !== undefined) ? (
      <Collapse
        defaultActiveKey={['0']}
        items={items}
        className="collapse"
      />
    ) : <Box />
  );
};

export default PostDetails;
