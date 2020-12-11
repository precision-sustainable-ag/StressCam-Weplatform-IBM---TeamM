import React from 'react'
import { Button, Col, Row, Container } from 'react-bootstrap'
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

export default function SelectCam() {
    return (
        <Styles>
            <Container>
                <Row className="command">
                    <Col >
                        <div><Button variant="primary" className="btn">Take Image</Button></div>
                    </Col>
                </Row>
            </Container>
        </Styles>
    )
}
