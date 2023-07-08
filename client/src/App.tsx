import { useEffect, useState } from 'react';
import Loading from './components/commons/LoadingComponent';
import AddNewPost from './components/addPost/AddNewPost';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return loading === false ? (
    <AddNewPost />
  ) : (
    <Loading />
  );
};

export default App;
