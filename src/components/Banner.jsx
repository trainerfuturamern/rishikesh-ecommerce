import React from "react";
import { Container } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';


function Banner(){
    return(
        <>
        <Container className="mt-4 md-4">
         <Carousel fade>
      <Carousel.Item>
       <img
        className="d-block w-100"
        src='https://images.unsplash.com/photo-1523275335684-37898b6baf30'
        alt='First slide'
        height='500px'
        style={{
            objectFit:"cover",
            borderRadius:"20px"
        }}
       />

        <Carousel.Caption>
          <Button variant="primary">Shop now</Button>
        </Carousel.Caption>
      </Carousel.Item>


      <Carousel.Item>
       <img
        className="d-block w-100"
        src='https://images.unsplash.com/photo-1498049794561-7780e7231661'
        alt='First slide'
        height='500px'
        style={{
            objectFit:"cover",
            borderRadius:"20px"
        }}
       />

        <Carousel.Caption>
          <Button variant="primary">Shop now</Button>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
       <img
        className="d-block w-100"
        src='https://images.unsplash.com/photo-1523275335684-37898b6baf30'
        alt='First slide'
        height='500px'
        style={{
            objectFit:"cover",
            borderRadius:"20px"
        }}
       />

        <Carousel.Caption>
          <Button variant="primary">Shop now</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
            </Container>
    </>
    )
}
export default Banner;
