import React from 'react'
import { Button, Form, Col, Row, Container } from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div`
    .btn{
        height: 35px;
        margin: 5px 0px 5px 0px;
        text-align: left;
    }

    .dropdown{
        height: 0px;
        margin: 7px 0px 7px 0px;
    }

    .command{
        display: flex;
        position: relative;
        background-color: #f4f4f4;
        borderBottom: 1px #ccc dotted;
    }

    .container {
        position: relative;
        padding-bottom: 10px;
    }

    .vertical-center {
        margin: 0;
        position: absolute;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }
`;

export default function SetFPS() {
    return (
        <Styles>
            <Container>
                <Row className="command">
                    <Col>
                        <p className="vertical-center">Select Frames Per Second:</p>
                    </Col>
                    <Col>
                        <Form className="dropdown">
                            <Form.Group controlId="exampleForm.SelectCustom">
                                {/* <Form.Label>Custom select</Form.Label> */}
                                <Form.Control as="select" size="sm" custom>
                                    <option>10</option>
                                    <option>15</option>
                                    <option>30</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col >
                        <div><Button variant="primary" className="btn">Set Frames</Button></div>
                    </Col>
                </Row>
            </Container>
        </Styles>
    )
}
