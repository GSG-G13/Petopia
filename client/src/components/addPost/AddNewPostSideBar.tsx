import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import { MessageAdd1 } from 'iconsax-react';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ICategory } from '../../interfaces';
import NormalPostModal from './NormalPostModal';
import AddAdoptionModal from './AddAdoptionModal';
import AddProductModal from './AddProductModal';
import Box from '../commons/Box';

const AddNewPostSideBar: React.FC = () => {
  const [normalPostModal, setNormalPostModal] = useState(false);
  const [adoptionModal, setAdoptionModal] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const { categoriesData } = useContext(AuthContext);
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
  const items = categoriesData.map((categoryData) => ({
    key: categoryData.categoryId,
    label: (<Box onClick={() => (getModal(categoryData))()}>{categoryData.title}</Box>),
  }));

  return (
    <>
      {normalPostModal ? (
        <NormalPostModal
          visible={normalPostModal}
          onClose={hideNormalPostModal}
          category={category}
        />
      ) : null}
      {adoptionModal ? <AddAdoptionModal visible={adoptionModal} onClose={hideAdoptionModal} /> : null}
      {productModal ? <AddProductModal visible={productModal} onClose={hideProductModal} /> : null}
      <Dropdown menu={{ items }}>
        <Button
          type="primary"
          size="large"
          style={{
            borderRadius: '150px', backgroundColor: '#F37F29', fontSize: '16px', width: 207.386,
          }}
        >
          <MessageAdd1 size="20" color="#fff" />
          <span style={{ marginLeft: '16px', borderRight: '2px solid #fff', paddingRight: '10px' }}>Create Post</span>
          <DownOutlined style={{ fontWeight: 'bold' }} />
        </Button>
      </Dropdown>
      {' '}

    </>
  );
};
export default AddNewPostSideBar;
