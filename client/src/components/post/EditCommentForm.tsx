import {
  Button, Form, Input, message,
} from 'antd';
import { Send } from 'iconsax-react';
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import Box from '../commons/Box';

interface Props {
  commentText: string
  commentId:number
  setEditable:Dispatch<SetStateAction<boolean>>
  setCommentText:Dispatch<SetStateAction<string>>
}

const EditComment = async (
  CommentId:number,
  commentText:string,
  setEditable:Dispatch<SetStateAction<boolean>>,
  setCommentText:Dispatch<SetStateAction<string>>,
) => {
  try {
    await axios.put(`/api/v1/comments/${CommentId}`, { commentText });
    setCommentText(commentText);
    setEditable(false);
    message.success('Comment edited successfully');
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status !== 401) {
      message.error('Something went wrong!');
    }
  }
};
const EditCommentForm:React.FC<Props> = ({
  commentId, commentText, setEditable, setCommentText,
}:Props) => {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      name={`edit-comment-form-${commentId}`}
      onFinish={() => EditComment(commentId, form.getFieldValue('commentText'), setEditable, setCommentText)}
      initialValues={{ commentText }}
    >
      <Box className="comment">
        <Form.Item
          name="commentText"
          rules={[{ required: true, message: 'Comment can\'t be empty' }]}
          messageVariables={{ label: 'comment' }}
        >
          <Input type="text" id="hi" className="comment-edit-field" placeholder="Write your comment.." />
        </Form.Item>
        <Form.Item>
          <Button className="send" type="link" icon={<Send className="send-icon" />} htmlType="submit" />
        </Form.Item>
      </Box>
    </Form>
  );
};
export default EditCommentForm;
