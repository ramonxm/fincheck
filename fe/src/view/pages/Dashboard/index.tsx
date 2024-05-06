import { useAuth } from '../../../app/hooks/useAuth';

export const Dashboard = () => {
  const { signout } = useAuth();
  return <h1> Dashboard Page</h1>;
};
