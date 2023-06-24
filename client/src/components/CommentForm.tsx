import { Button, Form, Input } from "antd"
import { Send } from "iconsax-react"
import Image from "./Image"

interface Props {
    userImage: string
}
const CommentForm: React.FC<Props> = ({ userImage }) => {
    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            name="comment-form">
            <div className='comment'>
                <Image src={userImage} height="40px" width="40px" className='user-img' />
                <Form.Item
                    name="commentText"
                    rules={[{ required: true, message: 'Comment can\'t be empty' }]}
                    messageVariables={{ label: 'comment' }}>
                    <Input type="text" id='hi' className='comment-field' placeholder='Write your comment..' />
                </Form.Item>
                <Form.Item>
                    <Button className='send' type="link" icon={<Send className='send-icon' />} htmlType="submit"></Button>
                </Form.Item>
            </div>
        </Form>
    )
}
export default CommentForm