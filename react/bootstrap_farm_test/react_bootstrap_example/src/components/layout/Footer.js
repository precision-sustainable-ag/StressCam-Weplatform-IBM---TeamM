import React from "react";
import { Container, Col, Row, List, Paragraph } from "react-bootstrap";
import styled from 'styled-components'




const FooterPage = () => {
  return (
    <FooterContainer className="main-footer">
        <div className="footer-middle" style={{backgroundColor: '#222', position: 'relative', left: 0, right: 0, bottom: 0}}>
            <Container>
                <Row>
                    <Col className="col-md-3 col-sm-6">   
                        <p>Contact Us</p>
                    </Col>
                    <Col className="col-md-3 col-sm-6">   
                    </Col>
                    <Col className="col-md-3 col-sm-6">   
                    </Col>
                    <Col className="col-md-3 col-sm-6">   
                        <div className="footer-bottom">
                            <p className="text-xs-center">
                                &copy;{new Date().getFullYear()} Connected Farms
                            </p>
                        </div>
                    </Col>
                </Row>
                {/* Footer Bottom */}
                
            </Container>
        </div>
    </FooterContainer>
  );
}

export default FooterPage;

const FooterContainer = styled.div`
    .container{
        color: #bbb;
        padding-top: 3rem;
        position: relative;
        bottom: 0;
    }

    
`;
