import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { message } from 'antd';

interface User {
  userId: number
  fullName: string
  email:string
  userImage: string
  address:string
  phone:string
  followerCount: number
  followingCount: number
}
interface Category {
  categoryId:number
  title:string
}

interface AuthProps {
  userData: User,
  categoriesData:Category[]
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
  },
  categoriesData: [{ categoryId: 0, title: '' }],
});
interface IChildrenProps {
  children : React.ReactNode
}

export const AuthContextProvider = ({ children } : IChildrenProps) => {
  const [userData, setUser] = useState<User>({
    userId: 0,
    fullName: '',
    email: '',
    userImage: '',
    address: '',
    phone: '',
    followerCount: 0,
    followingCount: 0,
  });
  const [categoriesData, setCategories] = useState<Category[]>([{ categoryId: 0, title: '' }]);

  const fetchAuthData = async () => {
    try {
      const { data: { user, categories } } = await axios.get('/api/v1/auth');
      if (user && categories) {
        setUser(user);
        setCategories(categories);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        message.error('Something went wrong!');
      }
    }
  };
  useEffect(() => {
    fetchAuthData();
  }, []);
  return (
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
