import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { userRegister } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../redux/productSlice';

function AddProduct() {
    const { Formik } = formik;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const schema = yup.object().shape({
        productName:yup.string().required("Please enter product name"),
        productPrice: yup.number().required("Please enter product price"),
        productDescription: yup.string().required("Please enter product description"),
        productPhoto: yup.string().required("Please add product photo"),
    });

    const handleAddProduct = (values) => {
        
        values.id = Date.now(); // 

        dispatch(addProduct(values));
        toast.success("Product added successfully!");
        navigate("/admin/list-products");


    }

    return (
        <Container className='mt-4'>
            <Row className='justify-content-center'>
                <Col md={4}>
                    <Row>
                        <Col>
                            <h4>Add Product</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Formik
                                validationSchema={schema}
                                onSubmit={handleAddProduct}
                                initialValues={{
                                    productName:'',
                                    productPrice: 0,
                                    productDescription: '',
                                    productPhoto: '',

                                }}
                            >
                                {({ handleSubmit, handleChange, values, touched, errors }) => (
                                    <Form noValidate onSubmit={handleSubmit}>
                                       <Row className="mb-3">
                                            <Form.Group as={Col} controlId="validationFormik01">
                                                <Form.Label>Product Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="productName"
                                                    value={values.productName}
                                                    onChange={handleChange}
                                                    isValid={touched.productName && !errors.productName}
                                                    isInvalid={touched.productName && !!errors.productName}
                                                />
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.productName}
                                                </Form.Control.Feedback>

                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="validationFormik01">
                                                <Form.Label>Product Price</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="productPrice"
                                                    value={values.productPrice}
                                                    onChange={handleChange}
                                                    isValid={touched.productPrice && !errors.productPrice}
                                                    isInvalid={touched.productPrice && !!errors.productPrice}
                                                />
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.productPrice}
                                                </Form.Control.Feedback>

                                            </Form.Group>
                                        </Row>
                                        <Row className='mb-3'>
                                            <Form.Group as={Col} controlId="validationFormik02">
                                                <Form.Label>Product Description</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={5}
                                                    name="productDescription"
                                                    value={values.productDescription}
                                                    onChange={handleChange}
                                                    isValid={touched.productDescription && !errors.productDescription}
                                                    isInvalid={touched.productDescription && !!errors.productDescription}
                                                />

                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.productDescription}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                        </Row>
                                        <Row className='mb-3'>
                                            <Form.Group as={Col} controlId="validationFormik02">
                                                <Form.Label>Product Photo</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="productPhoto"
                                                    value={values.productPhoto}
                                                    onChange={handleChange}
                                                    isValid={touched.productPhoto && !errors.productPhoto}
                                                    isInvalid={touched.productPhoto && !!errors.productPhoto}
                                                />

                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.productPhoto}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                        </Row>

                                        <div className='d-grid'>
                                            <Button type="submit">Add Product</Button>
                                        </div>

                                    </Form>
                                )}
                            </Formik>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default AddProduct;