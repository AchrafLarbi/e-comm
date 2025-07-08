import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <Container fluid className="bg-secondry mt-5">
      <Row>
        <Col className="text-center py-4">
          <h4 className="mb-3">Django-Shoping</h4>
          <p className="mb-0">
            Developed with by{' '}
            <a
              href="https://github.com/romanyn36"
              target="_blank"
              rel="noopener noreferrer"
              className="text-danger"
            >
              (@romanyn36) GitHub
            </a>
          </p>
          <hr className="w-50 mx-auto my-3" />
          <p className="mb-0">
            Copyright &copy; <span className="text-danger">Romani Nasrat 2025</span>
          </p>
          <p className="mb-0">
            All rights reserved.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;