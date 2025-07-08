import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import { userRegisterAction } from "../actions/UserActions";

function RegisterPage() {
    // the redirect is used to redirect the user to the page he was before 
    // this is used in case the user is not logged in and he tries to access a page that requires login
    // we save user progress in the redirect variable and then we redirect him to the page he was before
    const navigate = useNavigate();
    const redirect = window.location.search ? window.location.search.split('=')[1] : '/';
    const [userdata, setUserData] = useState({ name: '', username: '', email: '', password: '', confirmPassword: '' });
    const [matchPassword, setMatchPassword] = useState(true);
    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);
    const submitHandler = (e) => {
        e.preventDefault();
        // make sure the password and the confirm password are the same

        if (validatePassword()) {
            dispatch(userRegisterAction(name, username, email, password));
          
        
    

        }
    }
    const handlechange = (e) => {
        setUserData({ ...userdata, [e.target.name]: e.target.value });
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
    const { name, username, email, password, confirmPassword } = userdata;
    return (

        <Container>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    <h1>Register</h1>
                    {

                        loading ? <Loader size={50}></Loader> : error ? <Message variant='danger'> {error}</Message> : ''
                    }
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                name='name'
                                onChange={handlechange}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='username'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type='username'
                                placeholder='Enter username'
                                value={username}
                                name='username'
                                onChange={handlechange}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                name='email'
                                onChange={handlechange}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                name='password'
                                onChange={handlechange}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='confirmPassword'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Confirm password'
                                value={confirmPassword}
                                name='confirmPassword'
                                onChange={handlechange}
                            ></Form.Control>
                        </Form.Group>
                        {!matchPassword ? <Message className="mt-5" variant='danger'>
                            Passwords do not match
                        </Message> : ''}
                        <Button type='submit' variant='primary'>Register</Button>
                    </Form>
                    <Row className='py-3'>
                        <Col>
                            Have an Account ? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </Container>
    )
}
export default RegisterPage;