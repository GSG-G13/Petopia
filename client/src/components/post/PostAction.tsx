import {
  Dropdown, MenuProps, message,
} from 'antd';
import { More } from 'iconsax-react';
import axios from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';
import Box from '../commons/Box';
import { ICategory, IPost } from '../../interfaces';
import NormalPostModal from '../addPost/NormalPostModal';
import AddAdoptionModal from '../addPost/AddAdoptionModal';
import AddProductModal from '../addPost/AddProductModal';

interface Props {
  userId:number
  userPost:number
  postId:number
  posts:IPost[]
  setPosts:Dispatch<SetStateAction<IPost[]>>
  userType:string
  post:IPost,
  commentsCounts:number,
  likesCount:number
}
const deletePost = async (
  postId:number,
  posts:IPost[],
  setPosts:Dispatch<SetStateAction<IPost[]>>,

) => {
  try {
    await axios.delete(`/api/v1/posts/${postId}`);
    const newPosts = posts.filter((post) => post.postId !== postId);
    setPosts(newPosts);
    message.success('Post deleted successfully');
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status !== 401) {
      message.error('Something went wrong!');
    }
  }
};

const PostActions:React.FC<Props> = ({
  userPost, userId, postId, posts, setPosts, userType, post, commentsCounts, likesCount,
}:Props) => {
  if (userPost === userId || userType === 'admin') {
    const [normalPostModal, setNormalPostModal] = useState(false);
    const [adoptionModal, setAdoptionModal] = useState(false);
    const [productModal, setProductModal] = useState(false);
    const [category, setCategory] = useState<ICategory>({ title: 'Post', categoryId: 3 });
    const showNormalPostModal = () => {
      setNormalPostModal(true);
    };

    const hideNormalPostModal = () => {
      setNormalPostModal(false);
    };

    const showAdoptionModal = () => {
      setAdoptionModal(true);
    };

    const hideAdoptionModal = () => {
      setAdoptionModal(false);
    };

    const showProductModal = () => {
      setProductModal(true);
    };

    const hideProductModal = () => {
      setProductModal(false);
    };
    const getModal = (categoryData:ICategory) => {
      switch (categoryData.title) {
        case 'Post':
          setCategory(() => categoryData);
          return showNormalPostModal;
        case 'Sell':
          return showProductModal;
        case 'Adoption':
          return showAdoptionModal;
        default:
          setCategory(() => categoryData);
          return showNormalPostModal;
      }
    };
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <Box onClick={() => (getModal({ title: post.category.title, categoryId: post.categoryId }))()}>
            Edit
          </Box>
        ),
      },
      {
        key: '2',
        label: (
          <Box onClick={() => deletePost(postId, posts, setPosts)}>
            Delete
          </Box>
        ),
      }];

    return (
      <>
        <Dropdown menu={{ items }} placement="bottomLeft">
          <More size="25" color="#FF8A65" className="pointer" />
        </Dropdown>
        {normalPostModal ? (
          <NormalPostModal
            visible={normalPostModal}
            onClose={hideNormalPostModal}
            category={category}
            post={post}
            commentsCounts={commentsCounts}
            likesCount={likesCount}
            type="Edit"
          />
        ) : null}
        {adoptionModal ? (
          <AddAdoptionModal
            visible={adoptionModal}
            onClose={hideAdoptionModal}
            post={post}
            commentsCounts={commentsCounts}
            likesCount={likesCount}
            type="Edit"
          />
        ) : null}
        {productModal ? (
          <AddProductModal
            visible={productModal}
            onClose={hideProductModal}
            commentsCounts={commentsCounts}
            likesCount={likesCount}
            post={post}
            type="Edit"
          />
        ) : null}
      </>
    );
  }
  return null;
};
export default PostActions;
