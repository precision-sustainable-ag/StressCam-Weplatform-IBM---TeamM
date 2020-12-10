import React from 'react'
import { Button, Form, Col, Row, Container } from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div`
    .btn{
        height: 35px;
        margin-top: 25px;
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

export default function SetSchedule() {
    return (
        <Styles>
            <Container>
                <Row className="command">
                    <Col>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Start Time</Form.Label>
                                <Form.Control type="time" placeholder="Enter height" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>End Time</Form.Label>
                                <Form.Control type="time" placeholder="Enter width" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col >
                        <div><Button variant="primary" className="btn">Change Schedule</Button></div>
                    </Col>
                </Row>
            </Container>
        </Styles>
    )
}
