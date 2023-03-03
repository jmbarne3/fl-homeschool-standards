import { useState } from "react";

import {
  Alert,
  Button,
  Card,
  Col,
  FormControl,
  FormLabel,
  Row
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  loginWithGoogle
} from "../../firebase";

export function Login(props) {
  const [sUsername, setSUsername] = useState("");
  const [sPassword, setSPassword] = useState("");
  const [rDisplayName, setRDisplayName] = useState("");
  const [rUsername, setRUsername] = useState("");
  const [rPassword, setRPassword] = useState("");

  const [authError, setAuthError] = useState("");
  const [regError, setRegError] = useState("");
  const navigate = useNavigate();

  const userLogin = () => {
    loginWithEmailAndPassword(sUsername, sPassword)
      .then(() => {
        navigate('/console');
      }, err => {
        if (err.message.includes('auth/network-request-failed')) {
          setAuthError("Invalid username or password.");
        } else {
          setAuthError(err.message);
        }
      });
  };

  const userRegister = () => {
    registerWithEmailAndPassword(rDisplayName, rUsername, rPassword)
      .then(() => {
        navigate('/console');
      }, err => {
        setRegError(err.message);
      });
  }

  const googleSignIn = () => {
    loginWithGoogle()
      .then(() => {
        navigate('/console');
      }, err => {
        console.log(err);
      })
  };

  return (
    <Row className="row-cols-1 row-cols-md-2 justify-content-evenly g-4">
      <Col xs="10" md="3">
        <Card className="my-2 my-md-5">
          <Card.Header>
            <Card.Title>Login</Card.Title>
          </Card.Header>
          <Card.Body>
            <div className="mb-3">
              <FormLabel htmlFor="sUsername">Email:</FormLabel>
              <FormControl type="email" name="sUsername" required={true} aria-required="true" onChange={ (e) => setSUsername(e.target.value)}></FormControl>
            </div>
            <div className="mb-3">
              <FormLabel htmlFor="sPassword">Password:</FormLabel>
              <FormControl type="password" name="sPassword" required={true} aria-required="true" onChange={ (e) => setSPassword(e.target.value)}></FormControl>
            </div>
            {authError ?
              <Alert variant="danger">{authError}</Alert> :
              null}
            <Button type="button" variant="success" onClick={userLogin}>Sign In</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col xs="10" md="3">
        <Card className="my-2 my-md-5">
          <Card.Header>
            <Card.Title>Register</Card.Title>
          </Card.Header>
          <Card.Body>
            <div className="mb-3">
              <FormLabel htmlFor="rDisplayName">Display Name:</FormLabel>
              <FormControl type="text" name="rDisplayName" required={true} aria-required="true" onChange={ (e) => setRDisplayName(e.target.value)} />
            </div>
            <div className="mb-3">
              <FormLabel htmlFor="rUsername">Email:</FormLabel>
              <FormControl type="email" name="rUsername" required={true} aria-required="true" onChange={ (e) => setRUsername(e.target.value)} />
            </div>
            <div className="mb-3">
            <FormLabel htmlFor="rPassword">Password:</FormLabel>
              <FormControl type="password" name="rPassword" required={true} aria-required="true" onChange={ (e) => setRPassword(e.target.value)} />
            </div>
            {regError ?
              <Alert variant="danger">{regError}</Alert> :
              null}
            <Button type="button" variant="success" onClick={userRegister}>Register</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col xs="10" md="3">
        <Card className="my-2 my-md-5">
          <Card.Header>
            <Card.Title>Sign in with Service</Card.Title>
          </Card.Header>
          <Card.Body>
            <Button className="w-100" variant="secondary" onClick={googleSignIn}>Sign in with Google</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
