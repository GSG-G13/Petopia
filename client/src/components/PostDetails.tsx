import { Col, Collapse, CollapseProps, Row, Typography } from "antd"
import { Box1, Pet } from "iconsax-react"

interface Props {
    petDetails?: {
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
const { Paragraph } = Typography;
const PostDetails: React.FC<Props> = ({ petDetails, productDetails }) => {

    const details = (
        petDetails !== undefined && petDetails !== null ? <>
            <Row>
                <Col span={12} className='collapse-details'>
                    <Paragraph>Name: {petDetails.petName}</Paragraph>
                </Col>
                <Col span={12} className='collapse-details'>
                    <Paragraph>Age: {petDetails.age}</Paragraph>
                </Col>
            </Row>
            <Row>
                <Col span={12} className='collapse-details'>
                    <Paragraph>Gender: {petDetails.gender}</Paragraph>
                </Col>
                <Col span={12} className='collapse-details'>
                    <Paragraph>PetType: {petDetails.petType.title}</Paragraph>
                </Col>
            </Row>
            <Row>
                <Col span={12} className='collapse-details'>
                    <Paragraph>HealthStatus: {petDetails.healthStatus}</Paragraph>
                </Col>
                <Col span={12} className='collapse-details'>
                    <Paragraph>AdoptionStatus: {petDetails.adoptionStatus}</Paragraph>
                </Col>
            </Row>
        </> : productDetails !== undefined && productDetails !== null ? <>
            <Row>
                <Col span={12} className='collapse-details'>
                    <Paragraph>Name: {productDetails.title}</Paragraph>
                </Col>
                <Col span={12} className='collapse-details'>
                    <Paragraph>Price: {productDetails.price}</Paragraph>
                </Col>
            </Row>
            <Row>
                <Col span={12} className='collapse-details'>
                    <Paragraph>Details: {productDetails.details}</Paragraph>
                </Col>
                <Col span={12} className='collapse-details'>
                    <Paragraph>Rating: {productDetails.rating}</Paragraph>
                </Col>
            </Row>
        </> : <></>
    )

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: petDetails !== undefined ? 'Pet Details' : productDetails !== undefined ? 'Product Details' : '',
            className: 'collapse-details',
            children: <>{details}</>,
        }
    ];
    return (
        <Collapse defaultActiveKey={['0']}
            ghost
            expandIcon={({ isActive }) => petDetails !== undefined ? <Pet rotate={isActive ? 180 : 0} size="20" /> : <Box1 size="20" />}
            items={items} />
    )
}
export default PostDetails