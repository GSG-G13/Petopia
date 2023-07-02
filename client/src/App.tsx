import { useEffect, useState } from 'react';
import Loading from './components/commons/LoadingComponent';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return loading === false ? (
    <h1>Petopia</h1>
  ) : (
    <Loading />
  );
};

export default App;
