import { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardDeck, Button, Navbar, ButtonGroup, Container, Row, Col, Table, Modal } from 'react-bootstrap';
import './Toko.css'
import detailProduct from './product.json'
import swal from 'sweetalert';


class Home extends Component {
  state = {
    detailProduct,
    Summary: [],
    show: false,
    Total: ''
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
      Summary.push({ nama: item.nama, harga: item.harga, jumlah: 1, total: item.harga })
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
    // mengecek apakah di dalam keranjang sudah ada item apa belum
    const i = Summary.findIndex(s => s.nama === item.nama)
    if (Summary[i].jumlah <= 1) {
      Summary.splice(i, 1)
    } else {
      Summary[i].harga = item.harga
      Summary[i].jumlah = Summary[i].jumlah - 1
      Summary[i].total = Summary[i].jumlah * item.harga
    }
    this.setState({ Summary: Summary })
    localStorage.setItem('SaveSummary', JSON.stringify(Summary))
  }
  onReset = () => {
    this.setState({ Summary: [] })
    localStorage.removeItem('SaveSummary')
  }

  onTotal = () => {
    const total = this.state.Summary
    const sumOfSummary = total.reduce((sum, currentValue) => {
      return sum + currentValue.total;
    }, 0);
    this.setState({ Total: sumOfSummary })
  }


  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="#home">E-Toko</Navbar.Brand>
            </Navbar>
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            <Product detailProduct={this.state.detailProduct} onAdd={this.onAdd} />
          </Col>
          <Col sm={4}>
            <br />
            {<Summary Summary={this.state.Summary} onRemove={this.onRemove} onAdd={this.onAdd} />}
            <ButtonGroup aria-label="Basic example">
              <Button onClick={this.state.Summary.length > 0 ? () => { this.handleShow(); this.onTotal() } : () =>
                swal({
                  title: "Silakan tambahkan produk",
                  icon: "error",
                })} variant="primary">
                Proses
              </Button>
              <Button onClick={() => this.onReset()} variant="secondary">Hapus</Button>
            </ButtonGroup>
            {<ModalSummary show={this.state.show} summary={this.state.Summary} handleShow={this.handleShow} handleClose={this.handleClose} Total={this.state.Total} onReset={this.onReset} />}
          </Col>
        </Row>
      </Container >
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
            <Card.Img variant="top" src={item.gambar} />
            <button onClick={() => {
              this.props.onAdd(item);
              swal({
                title: "Produk berhasil ditambahkan",
                icon: "success",
                text: item.nama
              });
            }}>
              <Card.Body>
                < Card.Title>
                  <strong>{item.nama}</strong>
                </Card.Title>
                <Card.Text>
                  {item.detail}
                </Card.Text>
                <Card.Text>
                  <strong>Rp {item.harga.toLocaleString()}</strong>
                </Card.Text>
                {/* <Button onClick={() => this.props.onAdd(item)} variant="primary">Tambahkan</Button> */}
              </Card.Body>
            </button>
          </Card>
        )}
      </CardDeck>
    )
  }
}

class Summary extends Component {
  render() {
    return (
      <div>
        <p><strong>Keranjang : {this.props.Summary.length}</strong></p>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>No</th>
              <th>Produk</th>
              <th></th>
              <th>@</th>
              <th></th>
              <th>Harga</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {this.props.Summary.map((item, i) =>
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.nama}</td>
                <td>
                  <Button onClick={() => this.props.onRemove(item)} variant="secondary">–</Button>
                </td>
                <td>{item.jumlah}</td>
                <td>
                  <Button onClick={() => this.props.onAdd(item)} variant="secondary">+</Button>
                </td>
                <td>Rp {item.harga.toLocaleString()}</td>
                <td>Rp {item.total.toLocaleString()}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    )
  }
}

class ModalSummary extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ringkasan Pemesanan</Modal.Title>
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
                  <td>Rp {item.harga.toLocaleString()}</td>
                  <td>Rp {item.total.toLocaleString()}</td>
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
                <td><strong>Rp {this.props.Total.toLocaleString()}</strong></td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => {
            this.props.handleClose();
            this.props.onReset()
            swal({
              title: "Pemesanan berhasil",
              text: "Pesanan sedang diproses",
              icon: "success",
            });
          }}>
            Pesan
          </Button>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

// 5210 8382 1159 9772