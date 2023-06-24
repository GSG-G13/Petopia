import { Popover } from "antd"
import { Call, Heart, MessageText1, Share, Whatsapp } from "iconsax-react"
import CopyLink from "./ShareComponent"

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
        <div className='content-pop'>
            <a href={`https://wa.me/${phoneNumber}`} className='contact-pop' ><Whatsapp /> {phoneNumber}</a>
            <a href={`https://t.me/${phoneNumber}`} className='contact-pop' ><Call /> {phoneNumber}</a>
        </div>
    );
    const share = (
        <div className='content-pop'>
            <CopyLink postID={postID} />
        </div>
    );
    return (<>
        <div className='post-buttons'>
            <div className='item'>
                <Heart className='icon'
                    variant={showLike ? "Bold" : "Outline"}
                    color={showLike ? "red" : "black"}
                    onClick={() => setShowLike(!showLike)} />
                <p>{likesCount} Like</p>
            </div>
            <div className='item'>
                <MessageText1 className='icon' variant="Outline" onClick={() => setShowComments(!showComments)} />
                <p>{commentsCount} Comment</p>
            </div>
            <Popover placement="rightBottom" title={'Share this post with your friends'} content={share} trigger="click" className='item'>
                <Share className='icon' variant="Outline" />
                <p>Share</p>
            </Popover>
            {(product || adoption) &&
                <div className='contact-owner'>
                    <Popover placement="rightBottom" title={adoption ? 'Contact with owner' : 'Contact with seller'} content={contact} trigger="click">
                        <MessageText1 />
                    </Popover>
                </div>}

        </div>
        <div className='hr' />
    </>
    )
}
export default PostButtons