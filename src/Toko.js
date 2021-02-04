import { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardDeck, Button, Navbar, ButtonGroup, Container, Row, Col, Table, Modal, CardImg } from 'react-bootstrap';
import './Toko.css'
import detailProduct from './product.json'

class Home extends Component {
  state = {
    detailProduct,
    Summary: JSON.parse(localStorage.getItem('Summary')),
    show: false
  }
  componentDidMount() {
    if (this.state.Summary === null) {
      this.setState({ Summary: [] })
    }
    console.log("componen did mount")
  }
  componentDidUpdate() {
    console.log("componen did update")
  }
  handleClose = () => {
    this.setState({ show: false })
  }
  handleShow = () => {
    this.setState({ show: true })
  }
  onAdd = (item) => {
    const Summary = this.state.Summary
    Summary.push(item)
    localStorage.setItem('Summary', JSON.stringify(Summary))
    this.setState({ Summary: Summary })
  }

  onDelete = (item) => {
    const Summary = this.state.Summary
    if (JSON.stringify(Summary).includes(item.nama)) {
      const index = Summary.indexOf(item)
      Summary.splice(index, 1)
      localStorage.setItem('Summary', JSON.stringify(Summary))
      this.setState({ Summary: Summary })
    } else {
      alert('Silakan tambahkan produk')
      localStorage.setItem('Summary', JSON.stringify(Summary))
    }
  }
  render() {
    return (
      <Container>
        <Row>
          <Col sm={8}>
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand><strong>E-TOKO</strong></Navbar.Brand>
            </Navbar>
          </Col>
          <Col sm={4}>
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand>Keranjang : {this.state.Summary === null ? 0 : this.state.Summary.length}</Navbar.Brand>
            </Navbar>
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            <Product detailProduct={this.state.detailProduct} onAdd={this.onAdd} onDelete={this.onDelete} />
          </Col>
          <Col sm={4}>
            <br />
            <Summary Summary={this.state.Summary} />
            <Button onClick={this.handleShow}>Checkout</Button>
            <ModalSummary show={this.state.show} handleShow={this.handleShow} handleClose={this.handleClose} />
          </Col>
        </Row>
      </Container>
    )
  }
}
export default Home

class Product extends Component {
  render() {
    return (
      <CardDeck>
        {this.props.detailProduct.map((item, i) =>
          <Card bg="light" key={i}>
            <Card.Img variant="top" src="dummy.png" />
            <Card.Body>
              < Card.Title>
                <strong>{item.nama}</strong>
              </Card.Title>
              <Card.Text>
                {item.detail}
              </Card.Text>
              <Card.Text>
                <strong>Rp {item.harga}</strong>
              </Card.Text>
              <ButtonGroup aria-label="Basic example">
                <Button onClick={() => this.props.onAdd(item)} variant="primary">Tambah</Button>
                <Button onClick={() => this.props.onDelete(item)} variant="secondary">Hapus</Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
        )}
      </CardDeck>
    )
  }
}

class Summary extends Component {
  render() {
    return (
      <Table responsive="sm">
        <thead>
          <tr>
            <th>No</th>
            <th>Produk</th>
            <th>Kuantitas</th>
            <th>Harga</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {this.props.Summary !== null ? this.props.Summary.map((item, i) =>
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.nama}</td>
              <td>{1}</td>
              <td>{item.harga}</td>
              <td>{item.harga}</td>
            </tr>
          ) : []}
        </tbody>
      </Table>
    )
  }
}

class ModalSummary extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Summary />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.props.handleClose}>
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}