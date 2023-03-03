import { Button, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink } from "react-router-dom";

export function AnonActions(props) {
  return (
    <LinkContainer to="/auth/login">
      <Button variant="secondary">Login</Button>
    </LinkContainer>
  )
}
