import React from 'react'
import styled from 'styled-components'

// about page component
export default function About() {
    return (
        <AboutContainer>
            <React.Fragment>
                <h1>About</h1>
                <p>This is the Connected Farms app v1.0.0</p>
            </React.Fragment>
        </AboutContainer>
        
    )
}

const AboutContainer = styled.div`
    .fill{
        min-height: 100%;
        background-color: #bbb;
    }
`;
