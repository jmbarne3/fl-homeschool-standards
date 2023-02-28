import { useAuthState } from 'react-firebase-hooks/auth';

export function HeaderBar(props) {
  const [user, loading, error] = useAuthState();

  return (
    <nav className="navbar navbar-nav"></nav>
  );
}
