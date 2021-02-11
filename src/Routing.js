import React, { } from "react";
import {
  Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./Toko";
import { Row, Col, Navbar, Nav } from "react-bootstrap";
import Login from "./Login";
import Admin from "./Admin";

// titik dua didalam deconstructor adalah alias
const HarusLogin = ({ capo: Capo, ...props }) => {
  const token = localStorage.getItem('token')
  return (
    <Route {...props} render={props2 => (
      token ?
        props.path === '/login' ? <Redirect to="/admin" />
          : <Capo {...props2} />
        : <Redirect to="/login" />
    )} />
  );
};

// class HarusLogin extends Component {
//   state = {}
//   render() {
//     const { capo: Capo, } = this.props
//     const token = localStorage.getItem
//     return (
//       <Route {...this.props} render={props2 => (
//         token ?
//           path == '/login' ? <Redirect to="/admin" />
//             : <Capo {...props2} />
//           : <Redirect to="/login" />
//       )} />
//     );
//   }
// }

export default function Routing() {
  return (
    <Router history={createBrowserHistory()}>
      <Row>
        <Col>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">E-TOKO</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/admin">Admin</Nav.Link>
              <Nav.Link href="https://www.google.com/">Google</Nav.Link>
            </Nav>
          </Navbar>
        </Col>
      </Row>
      <br />
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/" ><Home/></Route> */}
        <HarusLogin path="/login" component={Login} />
        <HarusLogin path="/admin" capo={Admin} />
      </Switch>
    </Router >
  );
}