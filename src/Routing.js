import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./Toko";
import { Row, Col, Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import Login from "./Login";

export default function Routing() {
  return (
    <Router>
      <Row>
        <Col>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">E Toko</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/admin">Admin</Nav.Link>
              <Nav.Link href="https://www.google.com/">Google</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-info">Search</Button>
            </Form>
          </Navbar>
        </Col>
      </Row>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/admin">
          <Login />
        </Route>
      </Switch>
    </Router >
  );
}