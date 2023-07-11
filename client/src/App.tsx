import HomePage from './components/HomePage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => (
  <ProtectedRoute>
    <HomePage />
  </ProtectedRoute>
);

export default App;
