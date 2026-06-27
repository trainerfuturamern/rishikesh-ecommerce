import { Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../redux/productSlice";

function ProductDetails({setCartItems,cartItems }){   //w = {products={products} setCartItems={setCartItems} cartItems={cartItems}}

    const dispatch = useDispatch();
    const {products} = useSelector((state) => state.productState);
    const {id} = useParams();  // {a:3}

    console.log("id----------->",id);
    console.log("products----------->",products);
    

    const singleProduct= products.find(
        (product) => product.id === Number(id)
    )

    console.log("singleProduct----------->", singleProduct);
    
   

    const handleAddToCart = ()=>{
        // cartItems++; // cartItems = cartItems + 1
        // setCartItems(cartItems + 1);
        dispatch(addCartItem(singleProduct));
        
    }



    return(
        <div>
            <Container>
            <Card className="border-0">
            {singleProduct ?  (
                 <Row>
                    <Col md={5}>
                    <Card.Img
                        src={singleProduct?.productPhoto ?? null }
                        style={{
                            height:"450px",
                            objectFit:"cover"
                        }}
                        />
                    </Col>


                    <Col md={7}>
                        <Card.Body>

                            <h2>{singleProduct?.productName ?? ""}</h2>

                            <p>
                                {singleProduct?.productDescription ?? ''}
                            </p>

                            <h3>
                                ${singleProduct?.productPrice ?? ''}
                            </h3>

                            <Button variant="dark"

                            onClick={handleAddToCart}
                                
                            >
                                add to cart
                            </Button>
                        </Card.Body>
                    </Col>

                </Row>
            ) : (
                <Row>
                    <Col className="text-center">
                        <h4>Product not found!</h4>
                    </Col>
                    </Row>
            )}

            
               


            </Card>

            </Container>

        </div>
    )
}

export default ProductDetails;