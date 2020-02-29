import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import QrReader from "react-qr-reader";
const App = () => {
  return (
    <Container>
      <Row>
        <Col sm={12} md={{ span: 6, offset: 3 }}>
          <QrReader
            delay={300}
            onError={err => console.log(err)}
            onScan={data => console.log(data)}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
