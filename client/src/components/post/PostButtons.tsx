import { Popover } from 'antd';
import {
  Call, MessageText1, Share, Whatsapp,
} from 'iconsax-react';
import CopyLink from './ShareComponent';
import Box from '../commons/Box';
import Paragraph from '../commons/Paragraph';
import LikePost from './LikePost';

interface Props {
  showComments: boolean
  setShowComments: (showComments: boolean) => void
  // showLike: boolean
  // setShowLike: (showLike: boolean) => void
  phoneNumber: number
  postId: number
  commentsCount: number
  likesCount: number
  adoption: boolean
  product: boolean
}
const PostButtons: React.FC<Props> = ({
  showComments, setShowComments,
  phoneNumber,
  // showLike, setShowLike,
  postId, likesCount, commentsCount, adoption, product,
}) => {
  const contact = (
    <Box className="content-pop">
      <a href={`https://wa.me/${phoneNumber}`} className="contact-pop">
        <Whatsapp />
        {' '}
        {phoneNumber}
      </a>
      <a href={`https://t.me/${phoneNumber}`} className="contact-pop">
        <Call />
        {' '}
        {phoneNumber}
      </a>
    </Box>
  );
  const share = (
    <Box className="content-pop">
      <CopyLink postID={postId} />
    </Box>
  );
  return (

    <Box className="post-buttons">
      <LikePost likesCount={likesCount} postId={postId} />
      <Box className="item" onClick={() => setShowComments(!showComments)}>
        <MessageText1 className="icon" variant="Outline" />
        <Paragraph className="pointer">
          {commentsCount}
          {' '}
          Comment
        </Paragraph>
      </Box>
      <Popover
        placement="rightBottom"
        title="Share this post with your friends"
        content={share}
        trigger="click"
        className="item"
      >
        <Share className="icon" variant="Outline" />
        <Paragraph className="pointer">Share</Paragraph>
      </Popover>
      {(product || adoption)
                && (
                <Box className="contact-owner">
                  <Popover
                    placement="rightBottom"
                    title={adoption ? 'Contact with owner' : 'Contact with seller'}
                    content={contact}
                    trigger="click"
                  >
                    <MessageText1 />
                  </Popover>
                </Box>
                )}
    </Box>

  );
};
export default PostButtons;
