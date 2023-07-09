/* eslint-disable max-len */
import {
  Button, Card, Avatar, Row, Col, Typography, Space, Badge, message,
} from 'antd';
import axios from 'axios';
import { BellOutlined, MailOutlined } from '@ant-design/icons';
import { Location } from 'iconsax-react';
import { useState, useEffect, useContext } from 'react';
import UsersModal from '../sideBars/UsersModal';
import '../../styles/profile.css';
import ImageComponent from '../commons/Image';
import Box from '../commons/Box';
import { IFollow, IUser } from '../../interfaces';
import { AuthContext } from '../context/AuthContext';
import FollowingCountContext from '../context/FollowingCountContext';

const { Title, Text } = Typography;

const UserProfile = ({ userId }:{ userId: number }) => {
  const iconWrapperStyle = {
    width: '40px',
    height: '40px',
    flexShrink: 0,
    borderRadius: '50px',
    border: '1px solid #F0F0F5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10px',
    marginLeft: '10px',
  };

  const iconStyle = {
    fontSize: '20px',
    color: '#0D161D',
  };
  const [profile, setProfile] = useState<IUser>();
  const [followings, setFollowings] = useState<IFollow[]>([]);
  const { followingCount, setFollowingCount } = useContext(FollowingCountContext);
  const checkIsFollowing = (id:number, arr:IFollow[]): boolean => {
    let result = false;
    arr.forEach((element:IFollow) => {
      if (element.followerId === id) {
        result = true;
      }
    });
    return result;
  };
  const getProfileData = async (id:number) => {
    try {
      const { data: { data } } = await axios.get(`/api/v1/users/${id}`);
      setProfile(() => data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        message.error('Something went wrong!');
      }
    }
  };
  const [normalPostModal, setNormalPostModal] = useState(false);
  const { userData } = useContext(AuthContext);

  const [type, setType] = useState('');
  const getFollowings = async () => {
    try {
      const { data: { data } } = await axios.get(`/api/v1/follow/followings/${userData.userId}`);
      setFollowings(data);
    } catch (error) {
      message.error('Something went wrong!');
    }
  };
  useEffect(() => {
    getProfileData(userId);
    getFollowings();
  }, []);
  const showNormalPostModal = () => {
    setNormalPostModal(true);
  };

  const hideNormalPostModal = () => {
    setNormalPostModal(false);
  };

  const follow = async (Id:number) => {
    try {
      const { data: { data } } = await axios.post(`/api/v1/follow/followers/${Id}`);
      setFollowings([...followings, data]);
      setFollowingCount((prev) => prev + 1);
      message.success('Followed successfully.');
    } catch (error) {
      message.error('Something went wrong!');
    }
  };
  const unfollow = async (Id:number) => {
    try {
      await axios.delete(`/api/v1/follow/followings/${Id}`);
      const updatedFollowings = followings.filter(
        (following) => following.followerId !== Id,
      );
      setFollowingCount((prev) => prev - 1);
      setFollowings(updatedFollowings);
      message.success('UnFollowed successfully.');
    } catch (error) {
      message.error('Something went wrong!');
    }
  };

  return (
    <Box className="profile">
      {normalPostModal
        ? (
          <UsersModal
            visible={normalPostModal}
            type={type}
            userId={userId}
            loggedId={userData.userId}
            onClose={hideNormalPostModal}
            setFollowingCount={setFollowingCount}
          />
        )
        : null}

      <Card className="card" bordered={false}>
        <ImageComponent
          alt="Cover Photo"
          height="90px"
          width="100%"
          className="profile-cover"
          src={profile?.profileImage === undefined
            ? 'https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=829&q=80'
            : profile.profileImage}
        />
        <Row>

          <Col
            span={12}
            style={{
              textAlign: 'right', position: 'absolute', marginTop: 20, right: '40px',
            }}
          >
            <Space>
              <Badge dot offset={[-10, 10]}>
                <Box style={iconWrapperStyle}>
                  <BellOutlined style={iconStyle} className="notification" />
                </Box>
              </Badge>
              {userData.userId === userId ? ''
                : (
                  <Button
                    type="primary"
                    size="large"
                    style={{
                      borderRadius: '150px', backgroundColor: '#F37F29', fontSize: '16px', width: 130,
                    }}
                    onClick={
                      checkIsFollowing(userId, followings) ? () => unfollow(userId) : () => follow(userId)
  }
                  >
                    {checkIsFollowing(userId, followings) ? 'Following' : 'Follow'}
                  </Button>
                )}
            </Space>
          </Col>

          <Col span={12}>
            <Avatar
              size={100}
              src={profile?.userImage}
              style={{
                marginTop: '-30px', marginLeft: 20, border: '2px solid white', zIndex: 1,
              }}
            />
            <Title level={3}>{profile?.fullName}</Title>
          </Col>
          <Row>
            <Col span={24} style={{ marginBottom: 15, width: '100%' }}>
              <Space>
                <Space style={{ width: '100%' }}>
                  <Box style={iconWrapperStyle}>
                    <Location style={iconStyle} className="notification" />
                  </Box>
                  <Text>{profile?.address}</Text>
                </Space>
                <Space>
                  <Box style={iconWrapperStyle}>
                    <MailOutlined style={iconStyle} className="notification" />
                  </Box>
                  <Text>{profile?.email}</Text>
                </Space>
              </Space>
            </Col>
            <Col span={24} style={{ marginBottom: 15 }}>
              <Space>
                <Text
                  onClick={() => {
                    setType(() => 'followings');
                    showNormalPostModal();
                  }}
                  className="pointer"
                >
                  <strong>
                    { userData.userId === profile?.userId
                      ? followingCount : profile?.followingCount}
                  </strong>
                  {' '}
                  Following
                </Text>
                <Text
                  onClick={() => {
                    setType(() => 'followers');
                    showNormalPostModal();
                  }}
                  className="pointer"
                >
                  <strong>{profile?.followerCount}</strong>
                  {' '}
                  Followers
                </Text>
              </Space>
            </Col>
            <Col span={12} style={{ marginBottom: 15 }}>
              <Space>
                <Avatar src="https://media.discordapp.net/attachments/1112051630985187378/1122439026390073394/38308a08c26e275d9560bcbabeb74324.png?width=320&height=320" size="small" />
                <Avatar src="https://media.discordapp.net/attachments/1112051630985187378/1122439026390073394/38308a08c26e275d9560bcbabeb74324.png?width=320&height=320" size="small" />
                <Avatar src="https://media.discordapp.net/attachments/1112051630985187378/1122439026390073394/38308a08c26e275d9560bcbabeb74324.png?width=320&height=320" size="small" />
                <Text>Recent Followers</Text>
              </Space>
            </Col>
          </Row>
        </Row>
      </Card>
    </Box>
  );
};

export default UserProfile;
