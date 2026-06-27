import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {UserContext} from "../context/UserContext";
import { useContext } from 'react';

function Register() {
    const { Formik } = formik;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const {users} = useSelector((state) => state.userState);   
    const {users, handleUserRegister} = useContext(UserContext);

    const schema = yup.object().shape({
        fullName:yup.string().required("Please enter fullname").min(2, "Fullname should contain min 2 characters"),
        email: yup.string().email("Please enter a valid email").required("Please enter email"),
        password: yup.string().required("Please enter password"),
    });

    const handleRegister = (values) => {
        
        values.id = Date.now(); // 
        values.role = "user";
        values.status = true;

        const user = users.find((u)=>u.email === values.email);

        if(user){
            toast.error("Email already exists!");
            return;
        }

        // dispatch(userRegister(values));
        handleUserRegister(values);
        toast.success("User registered successfully!");
        navigate("/login");


    }

    return (
        <Container className='mt-4'>
            <Row className='justify-content-center'>
                <Col md={4}>
                    <Row>
                        <Col>
                            <h4>User Register</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Formik
                                validationSchema={schema}
                                onSubmit={handleRegister}
                                initialValues={{
                                    fullName:'',
                                    email: '',
                                    password: '',

                                }}
                            >
                                {({ handleSubmit, handleChange, values, touched, errors }) => (
                                    <Form noValidate onSubmit={handleSubmit}>
                                       <Row className="mb-3">
                                            <Form.Group as={Col} controlId="validationFormik01">
                                                <Form.Label>Fullname</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="fullName"
                                                    value={values.fullName}
                                                    onChange={handleChange}
                                                    isValid={touched.fullName && !errors.fullName}
                                                    isInvalid={touched.fullName && !!errors.fullName}
                                                />
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.fullName}
                                                </Form.Control.Feedback>

                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="validationFormik01">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    isValid={touched.email && !errors.email}
                                                    isInvalid={touched.email && !!errors.email}
                                                />
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.email}
                                                </Form.Control.Feedback>

                                            </Form.Group>
                                        </Row>
                                        <Row className='mb-3'>
                                            <Form.Group as={Col} controlId="validationFormik02">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    isValid={touched.password && !errors.password}
                                                    isInvalid={touched.password && !!errors.password}
                                                />

                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.password}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                        </Row>

                                        <div className='d-grid'>
                                            <Button type="submit">Register</Button>
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

export default Register;