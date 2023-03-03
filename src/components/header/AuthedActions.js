import { Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { useAuthState } from "react-firebase-hooks/auth";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../../firebase";

export function AuthedActions(props) {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const userLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="default" id="authed-actions">
        {user.displayName}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <LinkContainer to="/console">
          <DropdownItem>Dashboard</DropdownItem>
        </LinkContainer>
        <Dropdown.Divider />
        <DropdownItem onClick={userLogout}>
          Log Out
        </DropdownItem>
      </Dropdown.Menu>
    </Dropdown>
  );
}
