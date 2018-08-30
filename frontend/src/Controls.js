import React from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap';

const Controls = (props) => (
  <Row>
    <Col xs={12} md={8}>
      <audio
        controls
        src={props.audio_url}
        >
        Your browser does not support the <code>audio</code> element.
      </audio>
    </Col>
  </Row>
);

export default Controls;
