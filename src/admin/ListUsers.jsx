import { Button, Col, Container, Form, Image, Modal, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./ListProducts.css";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import { deleteProduct } from "../redux/productSlice";
import { toast } from "react-toastify";
import { changeUserRole, changeUserStatus } from "../redux/userSlice";

const ListUsers = () => {

    const [show, setShow] = useState(false);
    const [deleteProductIndex, setDeleteProdcutIndex] = useState(null);
    const dispatch = useDispatch();

    const { users } = useSelector((state) => state.userState);

    const handleClose = () => setShow(false);

    const handleShow = (productId) => {
        setDeleteProdcutIndex(productId)
        setShow(true);
    }

    const handleProductDelete = () => {
        dispatch(deleteProduct(deleteProductIndex));
        toast.success("Product deleted!");
        setShow(false);
        setDeleteProdcutIndex(null);
    }

    const handleUserRoleChange = (payload)=>{
        dispatch(changeUserRole(payload));
        toast.success("User role updated!");
    }

    const handleUserStateChange = (userId)=>{
        dispatch(changeUserStatus(userId));
        toast.success("User status updated!");
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col className="d-flex justify-content-between">
                    <h4>List Users</h4>
                    <Link className="btn btn-primary" to="/admin/add-product">Add Product</Link>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Fullname</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Role</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, i) => (
                                <tr key={i}>
                                    <td>
                                        {i + 1}
                                    </td>
                                    <td>
                                        {user?.fullName ?? ''}
                                    </td>
                                    <td>
                                        {user?.email ?? ''}
                                    </td>
                                    <td>
                                        
                                        <Form.Check // prettier-ignore
                                            type="switch"
                                            id="custom-switch"
                                            label={user?.status ? "Active" : "Inactive"}
                                            onChange={()=>handleUserStateChange(user?.id)}
                                            defaultChecked={user?.status}
                                        />
                                    </td>
                                    <td>
                                        <Form.Select onChange={(event)=>handleUserRoleChange({id:user.id, role:event.target.value})} defaultValue={user?.role} aria-label="Default select example">
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                            <option value="seller">Seller</option>
                                        </Form.Select>
                                    </td>
                                    <td>
                                        <Link to={`/admin/edit-user/${user.id}`}>
                                            <CiEdit size={25} />
                                        </Link>

                                    </td>
                                    <td>
                                        <Button onClick={() => handleShow(user.id)}>
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

export default ListUsers;