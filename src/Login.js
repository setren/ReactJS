import { Component } from "react";
import { Form, Button, Card } from "react-bootstrap";

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
    // console.log(this.props.history)
    return (
      <Card style={{ width: '18rem' }} className="text-center">
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Card.Text>
            You need to log in before accessing admin page
          </Card.Text>
          <Form onSubmit={(e) => this.onSubmit(e)}>
            <Form.Group>
              <Form.Control type="text" placeholder="Enter username" />
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    )
  }
}

export default Login