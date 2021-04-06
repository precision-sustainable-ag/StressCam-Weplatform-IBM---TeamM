import React from 'react'
import Iframe from 'react-iframe'
import Editor from "./Editor"

export default function About() {
    return (
        <React.Fragment>
            <h1>Home</h1>
            <p>Welcome to Connected Farms Web! Here you will able to see graphs of plots and send commands to the camera.</p>
            <br/>
            {/* <iframe src="https://dataplatform.cloud.ibm.com/dashboards/5f577fdb-f3ce-4b1b-a56b-df27c8fa66d1/view/022afc2c1c8a33d671f2bde4079825017e3f2155babbd75789867b490d327197f33f1698c82f485fdd475664f7ec1751ce" />; */}
            {/* <Editor/> */}
            <Iframe url="https://dataplatform.cloud.ibm.com/dashboards/5f577fdb-f3ce-4b1b-a56b-df27c8fa66d1/view/022afc2c1c8a33d671f2bde4079825017e3f2155babbd75789867b490d327197f33f1698c82f485fdd475664f7ec1751ce"
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