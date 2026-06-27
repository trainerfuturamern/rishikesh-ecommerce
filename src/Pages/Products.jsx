import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Products(){

    const {products} = useSelector((state) => state.productState );

    return(
        <div>
            <Container className="mt-5">

                <h2 className="text-center mb-4">Our Products</h2>

                <Row>
                    {products?.map((product)=>(

                    <Col
                        lg={4}
                        md={6}
                        sm={12}
                        className="mb-4"
                        key={product.id} //uniqe characteristioc of the product in the array
                   >    
                        <Card className='shadow h-100 border-0'>
                        <Card.Img
                            variant="top"
                            src={product.productPhoto}
                            height="250px"
                            style={{
                                objectFit:"cover"
                            }}
                        />

                        <Card.Body>
                            <Card.Title>
                                {product.productName}
                            </Card.Title>

                            <Card.Text>
                                {product.productDescription}
                            </Card.Text>

                            <h5>
                               ${product.productPrice} 
                            </h5>
                        </Card.Body>


                        {/* here we pass the id and link the product details */}
                        <Link to={`/product/${product.id}`}>


                            <Button variant="dark" >View Details</Button>
                        </Link>


                        </Card>
                    
                    
                    
                    
                </Col>
                 )
                
                )}  
                </Row>
               

            </Container>
        </div>
    )
}
export default Products;