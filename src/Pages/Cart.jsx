import React from 'react'
import { Button, Col, Container, Form, Image, InputGroup, Row, Table } from 'react-bootstrap'
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import "./Cart.css";
import { cartItemQuantityDecrement, cartItemQuantityIncrement } from '../redux/productSlice';

const Cart = () => {
    
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.productState);

    const handleItemDecrement = (productId)=>{
        dispatch(cartItemQuantityDecrement(productId));
    }
    const handleItemIncrement = (productId)=>{
        dispatch(cartItemQuantityIncrement(productId));
    }


    const totalPrice = cartItems?.reduce((total,item)=>{

         total  += item.quantity * item.productPrice;

         return total

    }, 0);

    return (
        <Container>
            <Row>
                <Col>
                    <h4>Cart Items</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Photo</th>
                                <th>Product Name</th>
                                <th>Product Price</th>
                                <th>Quantity</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, i) => (
                                <tr key={i}>
                                    <td>
                                        {i + 1}
                                    </td>
                                    <td>
                                        <Image className="thumb-img" src={item?.productPhoto ?? null} alt={item?.productName ?? ''} />
                                    </td>
                                    <td>
                                        {item?.productName ?? ''}
                                    </td>
                                    <td>
                                        {item?.productPrice ?? 0}
                                    </td>
                                    <td className='quantity-col'>
                                        <InputGroup className="mb-3">
                                            <Button 
                                            onClick={()=>handleItemDecrement(item.id)} 
                                            variant="outline-danger" id="button-addon1"
                                            disabled={item.quantity < 2 ? true : false}
                                            >
                                                -
                                            </Button>
                                            <Form.Control
                                                aria-label="Example text with button addon"
                                                aria-describedby="basic-addon1"
                                                value={item.quantity}
                                                readOnly
                                                
                                            />
                                             <Button onClick={()=>handleItemIncrement(item.id)} variant="outline-success" id="button-addon1">
                                                +
                                            </Button>
                                        </InputGroup>

                                    </td>
                                    <td>
                                        <Button onClick={() => handleShow(item.id)}>
                                            <MdDelete size={25} />
                                        </Button>

                                    </td>
                                </tr>
                            ))}

                            <tr>
                                <td colSpan={6} className='text-end'>
                                    <h4>Total Price: ₹ {totalPrice}</h4>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default Cart