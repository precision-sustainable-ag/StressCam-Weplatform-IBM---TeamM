import React from 'react'
import styled from 'styled-components'


export default function About() {
    return (
        <AboutContainer>
            <React.Fragment className="fill">
                <div>
                <h1>About</h1>
                <p>This is the Connected Farms app v0.01</p>
                <img src="https://brand.ncsu.edu/img/logo/4x1white.jpg" alt="NC State Logo"></img>

                </div>
            </React.Fragment>
        </AboutContainer>
        
    )
}

const AboutContainer = styled.div`
    .fill
    {
        min-height: 100%;
        background-color: #bbb;
    }
`;