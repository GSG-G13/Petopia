import {
  Avatar, Button, Row, Col, Typography, Modal, message, Empty,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IFollow } from '../../interfaces';
import Box from '../commons/Box';

const { Title } = Typography;

const UsersModal = ({
  visible, onClose, userId, type, setFollowingCount, loggedId,
}: { visible: boolean, onClose: () => void, userId:number, type:string, loggedId:number
  setFollowingCount:Dispatch<SetStateAction<number>> }) => {
  const [users, setUsers] = useState<IFollow[]>([]);
  const [followings, setFollowings] = useState<IFollow[]>([]);
  const handleCancel = () => {
    onClose();
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
  const getFollowings = async (id:number) => {
    try {
      const { data: { data } } = await axios.get(`/api/v1/follow/followings/${id}`);
      setFollowings(data);
    } catch (error) {
      message.error('Something went wrong!');
    }
  };

  const getData = async (id:number, path: string) => {
    try {
      const { data: { data } } = await axios.get(`/api/v1/follow/${path}/${id}`);
      setUsers(data);
    } catch (error) {
      message.error('Something went wrong!');
    }
  };

  useEffect(() => { getData(userId, type); getFollowings(loggedId); }, []);

  const follow = async (id:number) => {
    try {
      const { data: { data } } = await axios.post(`/api/v1/follow/followers/${id}`);
      setFollowingCount((prev) => prev + 1);
      setFollowings([...followings, data]);
      message.success('Followed successfully.');
    } catch (error) {
      message.error('Something went wrong!');
    }
  };
  const unfollow = async (id:number) => {
    try {
      await axios.delete(`/api/v1/follow/followings/${id}`);
      const updatedFollowings = followings.filter(
        (following) => following.followerId !== id,
      );
      setFollowingCount((prev) => prev - 1);
      setFollowings(updatedFollowings);
      message.success('UnFollowed successfully.');
    } catch (error) {
      message.error('Something went wrong!');
    }
  };
  return (
    <Box>
      <Modal
        title={type}
        open={visible}
        onCancel={handleCancel}
        width={650}
        style={{ top: 20 }}
        footer={null}
      >
        {users.length !== 0 ? users.map((item) => (
          <Row key={item.followId} style={{ marginBottom: 16, alignItems: 'center' }} align="middle">
            <Col flex="auto">
              <Row align="middle" gutter={8}>
                <Col>
                  <Avatar
                    src={type === 'followings' ? item.followingUser?.userImage : item?.followerUser?.userImage}
                    shape="circle"
                    style={{ height: 50, width: 50 }}
                    icon={<UserOutlined />}
                  />
                </Col>
                <Col>
                  <Title level={5}>
                    <Link
                      to={`/profile/${type === 'followers'
                        ? item.followingId : item.followerId}`}
                      className="username"
                    >
                      {' '}
                      {type === 'followings' ? item.followingUser?.fullName : item?.followerUser?.fullName}
                    </Link>
                  </Title>
                </Col>
              </Row>
            </Col>
            <Col>
              {(type === 'followers' ? item.followingId : item.followerId) === loggedId ? null
                : (
                  <Button
                    type="dashed"
                    shape="round"
                    className="follow-button"
                    onClick={
                    checkIsFollowing(type === 'followers' ? item.followingId : item.followerId, followings)
                      ? () => unfollow(type === 'followers'
                        ? item.followingId : item.followerId) : () => follow(type === 'followers'
                        ? item.followingId : item.followerId)
}
                  >
                    {checkIsFollowing(
                      type === 'followers' ? item.followingId : item.followerId,
                      followings,
                    ) ? 'Following' : 'Follow'}
                  </Button>
                )}
            </Col>
          </Row>
        ))
          : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={`There are no ${type} yet`}
              style={{ display: 'flex', transitionDelay: 'display 5s', justifyContent: 'center' }}
            />
          )}
      </Modal>
    </Box>
  );
};

export default UsersModal;
