import React from 'react';
import { IFollowingContext } from '../../interfaces';

const FollowingCountContext = React.createContext<IFollowingContext>(
  { followingCount: 0, setFollowingCount: () => {} },
);

export default FollowingCountContext;
