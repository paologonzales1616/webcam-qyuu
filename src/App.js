import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";
import QrReader from "react-qr-reader";
import { ToastContainer, toast } from "react-toastify";

import logo_bali from "./assets/images/aspire-ad700864f130af0e76a4dc43b0227c78 1.png";
import logo_qyuu from "./assets/images/Group 27.png";
const App = () => {
  const [state, setstate] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [config, setConfig] = useState({
    host: "http://18.218.7.168/qyuu"
  });

  useEffect(() => {
    document.title = "QR Scanner";
  }, []);

  async function exitQue(id) {
    console.log(id);
    const options = {
      headers: config.headers,
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        id
      })
    };
    const res = await fetch(`${config.host}/qr/exit`, options);
    const content = await res.json();
    toast.info("You're out of the que.", { containerId: "A" });
  }

  async function getAccounts(phone_no) {
    console.log(phone_no);
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      mode: "cors"
    };
    if (!phone_no) {
      return;
    }
    setstate(true);

    const res = await fetch(`${config.host}/home-owner/${phone_no}`, options);
    const content = await res.json();
    setAccounts(content.accounts);
  }

  async function setQue(id) {
    const options = {
      headers: config.headers,
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        id
      })
    };
    const res = await fetch(`${config.host}/que`, options);
    const content = await res.json();
    setstate(false);
  }

  return (
    <Container fluid style={{ backgroundColor: "#2B3E4F", height: "100vh" }}>
      <ToastContainer
        enableMultiContainer
        containerId={"A"}
        position={toast.POSITION.TOP_RIGHT}
      />
      {state ? (
        <>
          <Row>
            <Col sm={12} md={{ span: 6, offset: 3 }}>
              <h2 style={{ color: "white" }} className="text-center mt-2">
                Accounts
              </h2>
            </Col>
            <Col
              sm={12}
              md={{ span: 6, offset: 3 }}
              className="text-center w-50"
            >
              <Button variant="info" onClick={() => setstate(false)}>
                <h3>SCAN AGAIN</h3>
              </Button>
            </Col>
          </Row>

          {accounts.map((account, index) => (
            <Row>
              <Col key={index} sm={12} md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      Name: <strong>{account.name}</strong>
                    </Card.Title>
                    <Card.Title>
                      Plate No.: <strong>{account.plate_no}</strong>
                    </Card.Title>
                    <Card.Title>
                      Unit No.: <strong>{account.unit_no}</strong>
                    </Card.Title>
                    <Card.Title>
                      Phone No.: <strong>{account.phone_no}</strong>
                    </Card.Title>
                    <Card.Title>
                      Account Type:
                      <strong>
                        {account.account_type == "home_owner"
                          ? " Home Owner"
                          : " Guest"}
                      </strong>
                    </Card.Title>
                    <Button
                      block
                      size="sm"
                      variant="outline-primary"
                      onClick={() => setQue(account.id)}
                    >
                      QUE
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ))}
        </>
      ) : (
        <Row>
          <Col className="text-center" sm={12} md={{ span: 6, offset: 3 }}>
            <Image src={logo_bali} fluid width="200" alt="logo_name" />
          </Col>
          <Col sm={12} md={{ span: 6, offset: 3 }}>
            <h4 className="text-center" style={{ color: "white" }}>
              Scan QR Code
            </h4>
          </Col>
          <Col sm={12} md={{ span: 6, offset: 3 }}>
            <center>
              <QrReader
                delay={300}
                onError={err => console.log(err)}
                onScan={data => {
                  if (!data) {
                    return;
                  }

                  if (data.length == 11) {
                    getAccounts(data);
                    return;
                  }

                  exitQue(data);
                }}
                style={{ width: "50%" }}
              />
            </center>
          </Col>
          <Col className="text-center mt-2" sm={12} md={{ span: 6, offset: 3 }}>
            <Image src={logo_qyuu} fluid width="150" alt="logo_name" />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default App;
