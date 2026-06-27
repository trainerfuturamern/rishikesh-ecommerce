import { Button, Col, Container, Image, Modal, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./ListProducts.css";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import { deleteProduct } from "../redux/productSlice";
import { toast } from "react-toastify";

const ListProducts = () => {

    const [show, setShow] = useState(false);
    const [deleteProductIndex, setDeleteProdcutIndex] = useState(null);
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.productState);

    const handleClose = () => setShow(false);

    const handleShow = (productId) =>{
        setDeleteProdcutIndex(productId)
        setShow(true);
    }

    const handleProductDelete = () => {
        dispatch(deleteProduct(deleteProductIndex));
        toast.success("Product deleted!");
        setShow(false);
        setDeleteProdcutIndex(null);
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col className="d-flex justify-content-between">
                    <h4>List Products</h4>
                    <Link className="btn btn-primary" to="/admin/add-product">Add Product</Link>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Photo</th>
                                <th>Product Name</th>
                                <th>Product Price</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, i) => (
                                <tr key={i}>
                                    <td>
                                        {i + 1}
                                    </td>
                                    <td>
                                        <Image className="thumb-img" src={product?.productPhoto ?? null} alt={product?.productName ?? ''} />
                                    </td>
                                    <td>
                                        {product?.productName ?? ''}
                                    </td>
                                    <td>
                                        {product?.productPrice ?? 0}
                                    </td>
                                    <td>
                                        <Link to={`/admin/edit-product/${product.id}`}>
                                            <CiEdit size={25} />
                                        </Link>

                                    </td>
                                    <td>
                                        <Button onClick={()=>handleShow(product.id)}>
                                            <MdDelete size={25} />
                                        </Button>

                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure, you want to delete this product?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleProductDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default ListProducts;