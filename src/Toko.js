import { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardDeck, Button, Navbar, ButtonGroup, Container, Row, Col, Table, Modal } from 'react-bootstrap';
import './Toko.css'
import detailProduct from './product.json'

class Home extends Component {
  state = {
    detailProduct,
    Summary: [],
    show: false,
  }
  componentDidMount() {
    const summaryLocal = localStorage.getItem('SaveSummary')
    const Summary = summaryLocal ? JSON.parse(summaryLocal) : []
    this.setState({ Summary })
    console.log("componen did mount")

    // const x = new Object()
    // x['buah'] = 'mangga'
    // x['binatang'] = 'domba'
    // delete x.binatang
    // console.log(Object.keys(x))
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
    // mengecek apakah di dalam keranjang sudah ada item apa belum
    const i = Summary.findIndex(s => s.nama === item.nama)
    if (i < 0) {
      Summary.push({ nama: item.nama, jumlah: 1, total: item.harga })
    } else {
      Summary[i].harga = item.harga
      Summary[i].jumlah = Summary[i].jumlah + 1
      Summary[i].total = Summary[i].jumlah * item.harga
    }
    this.setState({ Summary: Summary })
    localStorage.setItem('SaveSummary', JSON.stringify(Summary))
  }
  onRemove = (item) => {
    const Summary = this.state.Summary
    if (Summary.includes(item)) {
      const index = Summary.indexOf(item)
      Summary.splice(index, 1)
      this.setState({ Summary: Summary })
    } else {
      alert('Silakan tambahkan produk')
    }
  }
  onReset = () => {
    this.setState({ Summary: [] })
    localStorage.removeItem('SaveSummary')
  }
  render() {
    return (
      <Container fluid>
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
            <Product detailProduct={this.state.detailProduct} onAdd={this.onAdd} />
          </Col>
          <Col sm={4}>
            <br />
            {this.state.Summary === null ? this.setState({ Summary: [] }) : <Summary Summary={this.state.Summary} />}
            <ButtonGroup aria-label="Basic example">
              <Button onClick={() => this.handleShow()} variant="primary">Proses</Button>
              <Button onClick={() => this.onReset()} variant="secondary">Hapus</Button>
            </ButtonGroup>
            {this.state.Summary === null ? this.setState({ Summary: [] }) : <ModalSummary show={this.state.show} summary={this.state.Summary} handleShow={this.handleShow} handleClose={this.handleClose} />}
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.Summary.map((item, i) =>
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.nama}</td>
              <td>{item.jumlah}</td>
              <td>Rp {item.harga}</td>
              <td>Rp {item.total}</td>
              <td>
                <Button onClick={() => console.log(item)} variant="secondary">Batal</Button>
              </td>
            </tr>
          )}
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
          <Modal.Title>Ringkasan Pesanan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              {this.props.summary.map((item, i) =>
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.nama}</td>
                  <td>{item.jumlah}</td>
                  <td>Rp {item.harga}</td>
                  <td>Rp {item.total}</td>
                </tr>
              )
              }
            </tbody>
            <tbody>
              <tr >
                <td><strong>Total</strong></td>
                <td></td>
                <td></td>
                <td></td>
                <td><strong>Rp </strong></td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.props.handleClose}>
            Lanjutkan
          </Button>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}