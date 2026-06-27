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
import { useNavigate, useParams } from 'react-router-dom';

function EditUser() {
    const { Formik } = formik;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {users} = useSelector((state) => state.userState);  
    const {id} = useParams();  

    const user = users.find((u) => u.id === Number(id));

    const schema = yup.object().shape({
        fullName:yup.string().required("Please enter fullname").min(2, "Fullname should contain min 2 characters"),
        email: yup.string().email("Please enter a valid email").required("Please enter email"),
        password: yup.string().required("Please enter password"),
    });

    const handleEditUser = (values) => {
        
        values.id = Number(id); // 
        values.role = user.role;
        values.status = user.status;

        dispatch(userRegister(values));
        toast.success("User updated successfully!");
        navigate("/admin/list-users");


    }

    return (
        <Container className='mt-4'>
            {user ? (
                <Row className='justify-content-center'>
                <Col md={4}>
                    <Row>
                        <Col>
                            <h4>Edit Register</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Formik
                                validationSchema={schema}
                                onSubmit={handleEditUser}
                                initialValues={{
                                    fullName:user?.fullName,
                                    email: user?.email,
                                    password: user?.password,

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
                                            <Button type="submit">Update User</Button>
                                        </div>

                                    </Form>
                                )}
                            </Formik>
                        </Col>
                    </Row>
                </Col>
            </Row>
            ) : ( <Row>
            <Col>
                <h4>
                Invalid user
                </h4>
            </Col>
                </Row>
            )}
            
        </Container>
    );
}

export default EditUser;