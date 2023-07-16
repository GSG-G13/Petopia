import {
  Button, Row, Col, Modal, message, Empty,
} from 'antd';
import axios from 'axios';
import {
  Dispatch, SetStateAction, useContext, useEffect, useState,
} from 'react';
import { Link } from 'react-router-dom';
import Box from '../commons/Box';
import Image from '../commons/Image';
import Paragraph from '../commons/Paragraph';
import formatTime from '../../helpers/timeFormatter';
import { AuthContext } from '../context/AuthContext';
import { IFollow } from '../../interfaces';
import FollowingCountContext from '../context/FollowingCountContext';

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
  const [followings, setFollowings] = useState<IFollow[]>([]);
  const { setFollowingCount } = useContext(FollowingCountContext);

  const { userData } = useContext(AuthContext);
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
  const checkIsFollowing = (id:number, arr:IFollow[]): boolean => {
    let result = false;
    arr.forEach((element:IFollow) => {
      if (element.followerId === id) {
        result = true;
      }
    });
    return result;
  };
  const handleCancel = () => {
    setShowLikers(false);
  };
  const getFollowings = async () => {
    try {
      const { data: { data } } = await axios.get(`/api/v1/follow/followings/${userData.userId}`);
      setFollowings(data);
    } catch (error) {
      message.error('Something went wrong!');
    }
  };
  useEffect(() => { fetchData(postId); getFollowings(); }, []);

  const follow = async (userId:number) => {
    try {
      const { data: { data } } = await axios.post(`/api/v1/follow/followers/${userId}`);
      setFollowings([...followings, data]);
      setFollowingCount((prev) => prev + 1);
      message.success('Followed successfully.');
    } catch (error) {
      message.error('Something went wrong!');
    }
  };
  const unfollow = async (userId:number) => {
    try {
      await axios.delete(`/api/v1/follow/followings/${userId}`);
      const updatedFollowings = followings.filter(
        (following) => following.followerId !== userId,
      );
      setFollowings(updatedFollowings);
      setFollowingCount((prev) => prev - 1);
      message.success('UnFollowed successfully.');
    } catch (error) {
      message.error('Something went wrong!');
    }
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
        {likers.length !== 0 ? likers.map((item) => (
          <Row key={item.userId} style={{ marginBottom: 16, alignItems: 'center' }} align="middle">
            <Col flex="auto">
              <Box className="user-post-container likers">
                <Image
                  src={item['user.userImage']}
                  height="50px"
                  width="50px"
                  className="user-img"
                  alt="user avatar"
                />
                <Link to={`/profile/${item.userId}`} className="username">{item['user.fullName']}</Link>
                <Paragraph className="date">{formatTime(item.createdAt)}</Paragraph>
              </Box>
            </Col>
            <Col>
              {item.userId === userData.userId ? null : (
                <Button
                  type="dashed"
                  shape="round"
                  className="follow-button"
                  onClick={
                    checkIsFollowing(item.userId, followings) ? () => unfollow(item.userId) : () => follow(item.userId)
}
                >
                  {checkIsFollowing(item.userId, followings) ? 'Following' : 'Follow'}
                </Button>
              )}
            </Col>
          </Row>
        )) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="There are no likes yet"
            style={{ display: 'flex', transitionDelay: 'display 5s', justifyContent: 'center' }}
          />
        ) }
      </Modal>
    </Box>
  );
};
export default PostLikers;
