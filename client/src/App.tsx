import { useEffect, useState } from 'react';
import Loading from './components/commons/LoadingComponent';
import { AuthContextProvider } from './components/context/AuthContext';
import HomePage from './components/HomePage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return loading ? <Loading /> : (
    <AuthContextProvider>
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    </AuthContextProvider>
  );
};

export default App;
