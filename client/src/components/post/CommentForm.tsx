import {
  Button, Form, Input, message,
} from 'antd';
import { Send } from 'iconsax-react';
import { Dispatch, SetStateAction, useContext } from 'react';
import axios from 'axios';
import Image from '../commons/Image';
import Box from '../commons/Box';
import { AuthContext } from '../context/AuthContext';
import { IComment } from '../../interfaces';

interface Props {
  postId: number
  setComments:Dispatch<SetStateAction<IComment[]>>
  setCommentsCounts:Dispatch<SetStateAction<number>>
}

const CommentForm: React.FC<Props> = ({ postId, setComments, setCommentsCounts }: Props) => {
  const [form] = Form.useForm();
  const { userData } = useContext(AuthContext);
  const addComment = async () => {
    try {
      const { data: { data } } = await axios.post(
        '/api/v1/comments/',
        { commentText: form.getFieldValue('commentText'), postId },
      );
      setComments((prevData) => [...prevData, {
        ...data,
        user: {
          fullName: userData.fullName,
          userImage: userData.userImage,
        },
      }]);
      setCommentsCounts((preCount) => preCount + 1);
      form.resetFields();
      message.success('Comment added successfully');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        message.error('Something went wrong!');
      }
    }
  };
  return (
    <Form
      form={form}
      name={`comment-form-${postId}`}
      onFinish={addComment}
    >
      <Box className="comment">
        <Image src={userData.userImage} height="40px" width="40px" className="user-img" alt="user avatar" />
        <Form.Item
          name="commentText"
          rules={[{ required: true, message: 'Comment can\'t be empty' }]}
          messageVariables={{ label: 'comment' }}
        >
          <Input type="text" id="hi" className="comment-field" placeholder="Write your comment.." />
        </Form.Item>
        <Form.Item>
          <Button className="send" type="link" icon={<Send className="send-icon" />} htmlType="submit" />
        </Form.Item>
      </Box>
    </Form>
  );
};
export default CommentForm;
