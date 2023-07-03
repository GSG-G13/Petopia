import {
  Button, Row, Col, Modal, message,
} from 'antd';
import axios from 'axios';
import {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { Link } from 'react-router-dom';
import Box from '../commons/Box';
import Image from '../commons/Image';
import Paragraph from '../commons/Paragraph';
import formatTime from '../../helpers/timeFormatter';

interface Props {
  showLikers:boolean
  setShowLikers:Dispatch<SetStateAction<boolean>>
  postId:number
}
interface ILiker {
  userId: number
  'user.fullName': string
  'user.userImage': string
  createdAt:string
}
const PostLikers:React.FC<Props> = ({ showLikers, setShowLikers, postId }:Props) => {
  const [likers, setLikers] = useState<ILiker[]>([]);
  const fetchData = async (id:number) => {
    try {
      const { data: { data } } = await axios.get(`/api/v1/like/likers/${id}`);
      setLikers(data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        message.error('Something went wrong!');
      }
    }
  };
  useEffect(() => { fetchData(postId); }, []);

  const handleCancel = () => {
    setShowLikers(false);
  };
  return (
    <Box>
      <Modal
        title="Likes"
        open={showLikers}
        onCancel={handleCancel}
        width={550}
        style={{ top: 20 }}
        footer={null}
        maskClosable={false}
      >
        {likers.map((item) => (
          <Row key={item.userId} style={{ marginBottom: 16, alignItems: 'center' }} align="middle">
            <Col flex="auto">
              <Box className="user-post-container" style={{ margin: 0 }}>
                <Image
                  src={item['user.userImage']}
                  height="50px"
                  width="50px"
                  className="user-img"
                  alt="user avatar"
                />
                <Link to={`user/${item.userId}`} className="username">{item['user.fullName']}</Link>
                <Paragraph className="date">{formatTime(item.createdAt)}</Paragraph>
              </Box>
            </Col>
            <Col>
              <Button type="dashed" shape="round" className="follow-button">Follow</Button>
            </Col>
          </Row>
        ))}
      </Modal>
    </Box>
  );
};
export default PostLikers;
