import axios from "axios";
import { createContext, useState, useEffect } from 'react';
import { message } from 'antd';

interface AuthProps {
    userId: number
    fullName: string
    userImage: string
    likesCount: number
    commentsCount: number
}

export const AuthContext = createContext<AuthProps>({
    userId: 0,
    fullName: '',
    userImage: '',
    likesCount: 0,
    commentsCount: 0
});