import { Component } from "react";
import { Form, Button } from "react-bootstrap";

class Login extends Component {
  onSubmit(e) {
    e.preventDefault()
    if (e.target[0].value === 'izul' && e.target[1].value === 'izul') {
      localStorage.setItem('token', '1i2y36i71g2h3ki127t3yi12lujn3i1u23')
      this.props.history.push('/admin')
    } else {
      alert('user/pass salah!')
    }
  }
  render() {
    console.log(this.props.history)
    return (
      <Form onSubmit={(e) => this.onSubmit(e)}>
        <Form.Group>
          <Form.Control type="text" placeholder="Enter username" />
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>)
  }
}

export default Login