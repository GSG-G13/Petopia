import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { message } from 'antd';
import { IUser, ICategory } from '../../interfaces';
import Loading from '../commons/LoadingComponent';

interface AuthProps {
  userData: IUser,
  categoriesData:ICategory[]
}

export const AuthContext = createContext<AuthProps>({
  userData: {
    userId: 0,
    fullName: '',
    email: '',
    userImage: '',
    address: '',
    phone: '',
    followerCount: 0,
    followingCount: 0,
    userType: 'regular',
  },
  categoriesData: [{ categoryId: 0, title: '' }],
});
interface IChildrenProps {
  children : React.ReactNode
}

export const AuthContextProvider = ({ children } : IChildrenProps) => {
  const [userData, setUser] = useState<IUser>({
    userId: 0,
    fullName: '',
    email: '',
    userImage: '',
    address: '',
    phone: '',
    followerCount: 0,
    followingCount: 0,
    userType: 'regular',
  });
  const [categoriesData, setCategories] = useState<ICategory[]>([{ categoryId: 0, title: '' }]);
  const [loading, setLoading] = useState(true);

  const fetchAuthData = async () => {
    try {
      setLoading(true);
      const { data: { user, categories } } = await axios.get('/api/v1/auth');
      if (user && categories) {
        setUser(user);
        setCategories(categories);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        message.error('Something went wrong!');
      }
    }
  };
  useEffect(() => {
    fetchAuthData();
  }, []);
  return loading === true ? <Loading /> : (

  // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{
      userData,
      categoriesData,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};
