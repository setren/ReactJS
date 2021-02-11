import { Component } from "react";
import { Button, Table, Modal, Form, Row, Col, Container } from 'react-bootstrap';
import './Admin.css'

class Admin extends Component {
  state = {
    showModalAdmin: false,
    showModalAdminIndex: 0,
    DetailProduct: JSON.parse(localStorage.getItem('DetailProduct')) || []
  }
  componentDidMount() {
    // console.log(JSON.parse(localStorage.getItem('DetailProduct')))
    // const detailProduct = localStorage.getItem('DetailProduct')
    // const DetailProduct = detailProduct ? JSON.parse(detailProduct) : []
    // this.setState({ DetailProduct })
  }
  componentDidUpdate() {
    localStorage.setItem('DetailProduct', JSON.stringify(this.state.DetailProduct))
  }
  handleClose = () => {
    this.setState({ showModalAdmin: false })
  }
  handleShow = () => {
    this.setState({ showModalAdmin: true })
  }
  onEdit = (e, item) => {
    e.preventDefault()
    this.handleShow()
    const DetailProduct = this.state.DetailProduct
    const i = DetailProduct.findIndex(s => s.nama === item.nama)
    this.setState({ showModalAdminIndex: i })
  }
  onDelete = (e, item) => {
    e.preventDefault()
    const DetailProduct = this.state.DetailProduct
    const i = DetailProduct.findIndex(s => s.nama === item.nama)
    DetailProduct.splice(i, 1)
    this.setState({ DetailProduct })
  }
  onAddProduct = (e) => {
    e.preventDefault()
    const DetailProduct = this.state.DetailProduct
    DetailProduct.push({ gambar: './gambar/Dummy.jpg', nama: e.target.nama.value, detail: e.target.detail.value, harga: parseInt(e.target.harga.value) })
    // localStorage.setItem('DetailProduct', JSON.stringify(DetailProduct))
    this.setState({ DetailProduct })
  }
  onSubmit = (e) => {
    e.preventDefault()
    this.handleClose()
    const DetailProduct = this.state.DetailProduct
    const i = this.state.showModalAdminIndex
    DetailProduct[i].nama = e.target.nama.value
    DetailProduct[i].detail = e.target.detail.value
    DetailProduct[i].harga = e.target.harga.value
    // localStorage.setItem('DetailProduct', JSON.stringify(DetailProduct))
    this.setState({ DetailProduct: DetailProduct })
  }
  render() {
    return (
      <Container fluid>
        <Row>
          <Col xs={6} md={4}>
            <h2>TAMBAH PRODUK</h2>
            <Form onSubmit={this.onAddProduct}>
              <Form.Group >
                <Form.Control placeholder="nama" name="nama" />
                <Form.Control placeholder="detail" name="detail" />
                <Form.Control placeholder="harga" name="harga" />
              </Form.Group>
              <Button variant="dark" type="submit">
                Tambahkan
              </Button>
            </Form>
          </Col>
          <Col xs={12} md={8}>
            <Table striped bordered hover variant="dark" responsive="sm">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Detail</th>
                  <th>Harga</th>
                  <th>Edit</th>
                  <th>Hapus</th>
                </tr>
              </thead>
              <tbody>
                {this.state.DetailProduct.map((item, i) =>
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.nama}</td>
                    <td>{item.detail}</td>
                    <td>Rp {item.harga.toLocaleString()}</td>
                    <td><Button onClick={(e) => this.onEdit(e, item)} variant="dark">edit</Button></td>
                    <td><Button onClick={(e) => this.onDelete(e, item)} variant="dark">hapus</Button></td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <ModalAdmin DetailProduct={this.state.DetailProduct} showModalAdminIndex={this.state.showModalAdminIndex} showModalAdmin={this.state.showModalAdmin} handleShow={this.handleShow} handleClose={this.handleClose} onSubmit={this.onSubmit} />
      </Container>
    )
  }
}

class ModalAdmin extends Component {
  render() {
    const DetailProduct = this.props.DetailProduct
    // console.log(DetailProduct)
    return DetailProduct.length ?
      <Modal show={this.props.showModalAdmin} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>EDIT DATA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.props.onSubmit}>
            <Form.Group >
              <Form.Control name="id" defaultValue={this.props.showModalAdminIndex + 1} />
              <Form.Control name="nama" defaultValue={DetailProduct[this.props.showModalAdminIndex].nama} />
              <Form.Control name="detail" defaultValue={DetailProduct[this.props.showModalAdminIndex].detail} />
              <Form.Control name="harga" defaultValue={DetailProduct[this.props.showModalAdminIndex].harga} />
            </Form.Group>
            <Button variant="dark" type="submit">
              Simpan
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      : null
  }
}

export default Admin