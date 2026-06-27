import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userLogin } from '../redux/userSlice';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Login() {
    const { Formik } = formik;
    const navigate = useNavigate();

    const {users, userLogin} = useContext(UserContext);
    

    const schema = yup.object().shape({
        email: yup.string().email("Please enter a valid email").required("Please enter email"),
        password: yup.string().required("Please enter password"),
    });

    const handleLogin = (values) => {
        
            const user = users.find((u)=> u.email === values.email);

            if(!user){
                toast.error("User not found!");
                return;
            }

            if(user.password !== values.password){
                toast.error("Wrong password!");
                return;
            }

            if(!user.status){
                 toast.error("User is inactive");
                 return;
            }

            userLogin(user);
            toast.success("User logged successfully!");
            navigate("/");

    }

    return (
        <Container className='mt-4'>
            <Row className='justify-content-center'>
                <Col md={4}>
                    <Row>
                        <Col>
                            <h4>User Login</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Formik
                                validationSchema={schema}
                                onSubmit={handleLogin}
                                initialValues={{
                                    email: '',
                                    password: '',

                                }}
                            >
                                {({ handleSubmit, handleChange, values, touched, errors }) => (
                                    <Form noValidate onSubmit={handleSubmit}>
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
                                            <Button type="submit">Login</Button>
                                        </div>

                                    </Form>
                                )}
                            </Formik>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col className='text-center'>
                                If you don't have an account, <Link to={'/register'}>Register now</Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;