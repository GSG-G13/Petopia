import { Card, Space } from 'antd';
import React from 'react';
import { Carousel } from 'antd';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { Share, Heart, MessageText1, Whatsapp, Call, Send } from 'iconsax-react';
import { Col, Row } from 'antd';
import { Popover } from 'antd';
import '../styles/post-card.css'
import { Link } from 'react-router-dom';


const petDetails = (<>
    <Row>
        <Col span={12} className='collapse-details'><p>name: cat</p></Col>
        <Col span={12} className='collapse-details'><p>age: 5</p></Col>
    </Row>
    <Row>
        <Col span={12} className='collapse-details'><p>gender: cat</p></Col>
        <Col span={12} className='collapse-details'><p>petType: cat</p></Col>
    </Row>
    <Row>
        <Col span={12} className='collapse-details'><p>healthStatus: cat</p></Col>
        <Col span={12} className='collapse-details'><p>adoptionStatus: cat</p></Col>
    </Row>
</>)

const items: CollapseProps['items'] = [
    {
        key: '1',
        label: 'Pet Details',
        className: 'collapse-details',
        children: <>{petDetails}</>,
    }
];
const content = (
    <div className='content-pop'>
        <a href='https://wa.me/<number>' className='contact-pop' ><Whatsapp /> +970599999999</a>
        <a href='https://t.me/<number>' className='contact-pop' ><Call /> +970599999999</a>
    </div>
);

const PostCard: React.FC = () => {
    return <Space direction="vertical" size={16}>
        <Card className='card'>
            <div className='post-header'>
                <div className='user-post-container'>
                    <img src="https://cdn.discordapp.com/attachments/1113720733860888597/1121405281147027526/IMG_20201207_144829.jpg" alt="user-img" className='user-img' />
                    <div className='user-post-info'>
                        <Link to={'#'} className='username'>Haitham</Link>
                        <h4 className='date'>13 min ago</h4>
                    </div>
                </div>
                <div className='label'>
                    <div className='top-label' ></div>
                    <p className='label-content'>Adoption</p>
                    <div className='down-label'></div>
                </div>
            </div>
            <Carousel className='carousel'>
                <div>
                    <img src="https://cdn.discordapp.com/attachments/1113720733860888597/1121405281147027526/IMG_20201207_144829.jpg" alt="image" className='img' />
                </div>
                <div>
                    <img src="https://cdn.discordapp.com/attachments/1113720733860888597/1121405280366899304/IMG_20201117_134403.jpg" alt="image" className='img' />
                </div>
                <div>
                    <img src="https://i.imgur.com/KcYHnFr.jpg" alt="image" className='img' />
                </div>
                <div>
                    <img src="https://i.imgur.com/v5xOSq2.jpg" alt="image" className='img' />
                </div>
                <div>
                    <img src="https://i.imgur.com/v2v02Ge.jpg" alt="image" className='img' />
                </div>
            </Carousel>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa fugit inventore, distinctio natus unde
                asperiores magni illum nobis accusamus magnam officia, ducimus eaque ut? Est repellat a exercitationem dignissimos fugit?</p>


            <Collapse defaultActiveKey={['0']} ghost items={items} />

            <div className='post-buttons'>
                <div className='item'>
                    <Heart className='icon' variant="Outline" />
                    <p>22.5K Like</p>
                </div>
                <div className='item'>
                    <MessageText1 className='icon' variant="Outline" />
                    <p>22.5K Comment</p>
                </div>
                <div className='item'>
                    <Share className='icon' variant="Outline" />
                    <p>Share</p>
                </div>
                <div className='contact-owner'>
                    <Popover placement="rightBottom" title={'Contact with owner'} content={content} trigger="click">
                        <MessageText1 />
                    </Popover>
                </div>
            </div>
            <div className='hr'/>
            <div className='comment'>
                <img src="https://cdn.discordapp.com/attachments/1113720733860888597/1121405281147027526/IMG_20201207_144829.jpg" alt="image" className='user-img' />
                <input type="text" id='hi' className='comment-field' placeholder='Write your comment..' />
                <Send className='send' />
            </div>
        </Card>
    </Space >
}
export default PostCard