import { Popover } from "antd"
import { Call, Heart, MessageText1, Share, Whatsapp } from "iconsax-react"
import CopyLink from "./ShareComponent"
import Box from "../commons/Box"
import Paragraph from "../commons/Paragraph"

interface Props {
    showComments: boolean
    setShowComments: (showComments: boolean) => void
    showLike: boolean
    setShowLike: (showLike: boolean) => void
    phoneNumber: number
    postID: number
    commentsCount: number
    likesCount: number
    adoption: boolean
    product: boolean
}
const PostButtons: React.FC<Props> = ({ showComments, setShowComments,
    phoneNumber, showLike, setShowLike,
    postID, likesCount, commentsCount, adoption, product
}) => {
    const contact = (
        <Box className='content-pop'>
            <a href={`https://wa.me/${phoneNumber}`} className='contact-pop' ><Whatsapp /> {phoneNumber}</a>
            <a href={`https://t.me/${phoneNumber}`} className='contact-pop' ><Call /> {phoneNumber}</a>
        </Box>
    );
    const share = (
        <Box className='content-pop'>
            <CopyLink postID={postID} />
        </Box>
    );
    return (<>
        <Box className='post-buttons'>
            <Box className='item'>
                <Heart className='icon'
                    variant={showLike ? "Bold" : "Outline"}
                    color={showLike ? "red" : "black"}
                    onClick={() => setShowLike(!showLike)} />
                <Paragraph className="pointer">{likesCount} Like</Paragraph>
            </Box>
            <Box className='item' onClick={() => setShowComments(!showComments)}>
                <MessageText1 className='icon' variant="Outline" />
                <Paragraph className="pointer">{commentsCount} Comment</Paragraph>
            </Box>
            <Popover placement="rightBottom" title={'Share this post with your friends'} content={share} trigger="click" className='item'>
                <Share className='icon' variant="Outline" />
                <Paragraph className="pointer">Share</Paragraph>
            </Popover>
            {(product || adoption) &&
                <Box className='contact-owner'>
                    <Popover placement="rightBottom" title={adoption ? 'Contact with owner' : 'Contact with seller'} content={contact} trigger="click">
                        <MessageText1 />
                    </Popover>
                </Box>}

        </Box>
        <Box className='hr' />
    </>
    )
}
export default PostButtons