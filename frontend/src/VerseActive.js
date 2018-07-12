import React from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap';

const VerseActive = ({text}) => (
  <Row>
    <Col xs={12} md={8}>
      {text}
    </Col>
  </Row>
);

export default VerseActive;
