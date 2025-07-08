import React from 'react'
import { Col, Container } from 'react-bootstrap'

function FormContainer({ children }) {
    return (
        <Container id="loginc" className='bg-light p-2 justify-content-md-center align-items-center d-flex flex-column'
         style={{maxWidth:'600px'}}>
            <Col xs={12} md={6} >
                {children}
            </Col>
        </Container>
    )
}

export default FormContainer