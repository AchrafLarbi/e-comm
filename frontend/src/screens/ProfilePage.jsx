import React from "react";
import { Container, Row, Col, Table, Card, Badge, ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import { getUserDetailAction, userUpadateProfileAction } from "../actions/UserActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/UserConstants";

function ProfilePage() {
    const [userData, setUserData] = useState({ name: '', username: '', email: '', password: '', confirmPassword: '' });
    const [matchPassword, setMatchPassword] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const userDetail = useSelector((state) => state.userDetail);
    const { loading, error, userDetail: user } = userDetail;
    const userUpadat = useSelector(state => state.UserUpdateProfileReducers);
    const { success } = userUpadat;
    useEffect(() => {
        if (!userLogin.userInfo) {
            navigate('/login');
        }
        else {
            if (!user || !user.name || success || user.id !== userLogin.userInfo.id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetailAction('profile'));

            }
            if (user && user.name) {
                setUserData({ name: user.name, username: user.username, email: user.email });
            }
        }
   

    }
        , [dispatch, navigate, userLogin.userInfo, user, success]);
    const submitHandler = (e) => {
        e.preventDefault();
        // make sure the password and the confirm password are the same

        if (validatePassword()) {
            // dispatch the action to update the user profile
            dispatch(userUpadateProfileAction({
                'id': user.id,
                'name': userData.name,
                'username': userData.username,
                'email': userData.email,
                'password': userData.password ? userData.password : ''
            }));

        }
    }
    const handlechange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const validatePassword = () => {
        if (password == confirmPassword) {
            setMatchPassword(true);
            return true;
        } else {
            setMatchPassword(false);
            return false;
        }
    }
    const { name, username, email, password, confirmPassword } = userData;

    return (
        <div className="m-0">
            <h2 className="text-center mb-4">My Profile</h2>
                    <Card className="shadow-sm border-0">
                        <Card.Header className="bg-primary text-white">
                            <h4 className="mb-0"><i className="fas fa-user-circle me-2"></i>Profile Information</h4>
                        </Card.Header>
                        <Card.Body>
                            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='name' className="mb-3">
                                        <Form.Label>Full Name</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text><i className="fas fa-user"></i></InputGroup.Text>
                                            <Form.Control
                                                type='name'
                                                placeholder='Enter your name'
                                                value={name}
                                                name='name'
                                                onChange={handlechange}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    
                                    <Form.Group controlId='username' className="mb-3">
                                        <Form.Label>Username</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text><i className="fas fa-at"></i></InputGroup.Text>
                                            <Form.Control
                                                type='username'
                                                placeholder='Enter username'
                                                value={username}
                                                name='username'
                                                onChange={handlechange}
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group controlId='email' className="mb-3">
                                        <Form.Label>Email Address</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text><i className="fas fa-envelope"></i></InputGroup.Text>
                                            <Form.Control
                                                type='email'
                                                placeholder='Enter email'
                                                value={email}
                                                name='email'
                                                onChange={handlechange}
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <hr className="my-4" />
                                    <h5 className="mb-3">Change Password</h5>

                                    <Form.Group controlId='password' className="mb-3">
                                        <Form.Label>New Password</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text><i className="fas fa-lock"></i></InputGroup.Text>
                                            <Form.Control
                                                type='password'
                                                placeholder='Enter new password'
                                                value={password}
                                                name='password'
                                                onChange={handlechange}
                                            />
                                        </InputGroup>
                                        <Form.Text muted>Leave blank to keep current password</Form.Text>
                                    </Form.Group>
                                    
                                    <Form.Group controlId='confirmPassword' className="mb-4">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text><i className="fas fa-lock"></i></InputGroup.Text>
                                            <Form.Control
                                                type='password'
                                                placeholder='Confirm new password'
                                                value={confirmPassword}
                                                name='confirmPassword'
                                                onChange={handlechange}
                                                isInvalid={!matchPassword && confirmPassword}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Passwords do not match
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    
                                    <div className="d-grid">
                                        <Button type='submit' variant='primary' size="md">
                                            <i className="fas fa-save me-2"></i>Update Profile
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Card.Body>
                    </Card>
        </div>
    )
}
export default ProfilePage;
