import { Component } from "react";
import { Button, Table, Modal, Form } from 'react-bootstrap';
import './Admin.css'

class Admin extends Component {
  state = {
    showModalAdmin: false,
    showModalAdminIndex: 0,
    DetailProduct: JSON.parse(localStorage.getItem('DetailProduct'))
  }
  componentDidMount() {
    const detailProduct = localStorage.getItem('DetailProduct')
    const DetailProduct = detailProduct ? JSON.parse(detailProduct) : []
    this.setState({ DetailProduct })
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
  onSubmit = (e) => {
    e.preventDefault()
    this.handleClose()
    const DetailProduct = this.state.DetailProduct
    // mengecek apakah di dalam keranjang sudah ada item apa belum
    const i = this.state.showModalAdminIndex
    DetailProduct[i].nama = e.target.nama.value
    DetailProduct[i].detail = e.target.detail.value
    DetailProduct[i].harga = e.target.harga.value
    this.setState({ DetailProduct: DetailProduct })
    localStorage.setItem('DetailProduct', JSON.stringify(DetailProduct))

  }
  render() {
    return (
      <div>
        <Table striped bordered hover variant="dark" responsive="sm">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Detail</th>
              <th>Harga</th>
              <th>Edit</th>
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
              </tr>
            )}
          </tbody>
        </Table>
        <ModalAdmin DetailProduct={this.state.DetailProduct} showModalAdminIndex={this.state.showModalAdminIndex} showModalAdmin={this.state.showModalAdmin} handleShow={this.handleShow} handleClose={this.handleClose} onSubmit={this.onSubmit} />
      </div >
    )
  }
}

class ModalAdmin extends Component {
  render() {
    const DetailProduct = this.props.DetailProduct
    return (
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
              <Form.Control name="harga" defaultValue={DetailProduct[this.props.showModalAdminIndex].harga.toLocaleString()} />
            </Form.Group>
            <Button variant="dark" type="submit">
              Simpan
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

export default Admin