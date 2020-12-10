import React from 'react'
import {Jumbotron as Jumbo, Container} from 'react-bootstrap'
import styled from 'styled-components'
import Image from './assets/WheatImage.jpg'

const Styles = styled.div`
    .Jumbo{
        background: url(${Image}) no-repeat fixed bottom;
        background size: cover;
        color: #fff;
        height: 200px;
        position: relative;
        z-index: -2;
    }

    .overlay{
        backgorund-color: #000;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index-1;
    }
`;

export const Jumbotron = () => (
    <Styles>
        <Jumbo fluid className="Jumbo">
            <div className='overlay'></div>
            <Container>
                <h1>Connected Farms</h1>
                <p>Helping Farmers Identify Stressed Crops</p>
            </Container>
        </Jumbo>
    </Styles>
)

export default Jumbotron;