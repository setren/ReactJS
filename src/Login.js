import { Component } from "react";
import { Form, Button, Card } from "react-bootstrap";

class Login extends Component {
  onSubmit(e) {
    e.preventDefault()
    if (e.target[0].value === 'setren' && e.target[1].value === 'setren') {
      localStorage.setItem('token', '378d66aa1a6b05a712a5fe64d77519e9')
      this.props.history.push('/admin')
    } else {
      alert('Username/password salah!')
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