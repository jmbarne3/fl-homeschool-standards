import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

import {
  Container,
  Nav,
  Navbar
} from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';
import { AuthedActions } from './AuthedActions';
import { AnonActions } from './AnonActions';

export function HeaderBar(props) {
  const [user, loading, error] = useAuthState(auth);
  let userActions;

  if (user) {
    userActions = <AuthedActions />
  } else {
    userActions = <AnonActions />
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Homeschool Standards</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className="justify-content-end">
            {userActions}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
