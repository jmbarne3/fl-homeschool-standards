import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

export function Dashboard(props) {
  const [user, loading, error] = useAuthState(auth);

  return (
    <h1 className="text-center">Hello, {user.displayName}!</h1>
  );
}
