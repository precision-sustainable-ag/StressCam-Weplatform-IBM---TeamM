import React from 'react'
import Iframe from 'react-iframe'

// home page component
export default function About() {
    return (
        <React.Fragment>
            <h1>Home</h1>
            <p>Welcome to Connected Farms Web! Here you will able to see graphs of plots and send commands to the camera.</p>
            <br/>

            <Iframe url="https://dataplatform.cloud.ibm.com/dashboards/d1fa6da4-5695-4ccf-ba94-25c8dd714c30/view/7517f10425af22e45fd2b1e4079825017e3f2155babbd75789867b490d327197f33f1698c82f485fdd475664f7ec1751ce"
                width="1000px"
                height="500px"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative" 
            />
        </React.Fragment>
    )
}