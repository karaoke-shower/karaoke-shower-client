import React from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap';

const Controls = () => (
  <Row>
    <Col xs={12} md={8}>
      <audio
        controls
        src="https://raw.githubusercontent.com/karaoke-shower/karaoke-shower-client/development/sample-data/mp3/ca038.mp3"
        >
        Your browser does not support the <code>audio</code> element.
      </audio>
    </Col>
  </Row>
);

export default Controls;
