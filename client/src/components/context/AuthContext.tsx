import axios from 'axios';
import {
  createContext, useState, useEffect, Dispatch, SetStateAction,
} from 'react';
import { message } from 'antd';
import { IUser, ICategory } from '../../interfaces';
import Loading from '../commons/LoadingComponent';

interface AuthProps {
  userData: IUser,
  categoriesData:ICategory[]
  userLogged: boolean
  setUserLogged: Dispatch<SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthProps>({
  userData: {
    userId: 0,
    fullName: '',
    email: '',
    userImage: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png',
    address: '',
    phone: '',
    followerCount: 0,
    followingCount: 0,
    userType: 'regular',
  },
  categoriesData: [{ categoryId: 0, title: '' }],
  userLogged: false,
  setUserLogged: () => {},
});
interface IChildrenProps {
  children : React.ReactNode
}

export const AuthContextProvider = ({ children } : IChildrenProps) => {
  const [userData, setUser] = useState<IUser>({
    userId: 0,
    fullName: '',
    email: '',
    userImage: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png',
    address: '',
    phone: '',
    followerCount: 0,
    followingCount: 0,
    userType: 'regular',
  });
  const [categoriesData, setCategories] = useState<ICategory[]>([{ categoryId: 0, title: '' }]);
  const [loading, setLoading] = useState(true);
  const [userLogged, setUserLogged] = useState(false);

  const fetchAuthData = async () => {
    try {
      setLoading(true);
      const { data: { user, categories } } = await axios.get('/api/v1/auth');
      if (user && categories) {
        setUser(() => user);
        setCategories(() => categories);
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
  }, [userLogged]);
  return loading === true ? <Loading /> : (

  // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{
      userData,
      categoriesData,
      userLogged,
      setUserLogged,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};
