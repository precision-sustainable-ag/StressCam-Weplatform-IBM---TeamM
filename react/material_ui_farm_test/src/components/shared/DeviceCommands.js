import React from 'react'
import Grid from '@material-ui/core/Grid';

import SelectCamera from '../commands/SelectCamera'
import ChangeInterval from '../commands/ChangeInterval'
import ChangeResolution from '../commands/ChangeResolution'
import ChangeImageType from '../commands/ChangeImageType'
import RunScript from '../commands/RunScript'
import SetFPS from '../commands/SetFPS'
import TakeImage from '../commands/TakeImage'
import SendData from '../commands/SendData'
import GetStatus from '../commands/GetStatus'
import ChangeSchedule from '../commands/ChangeSchedule'
import ChangeWidth from '../commands/ChangeWidth'

// component which instantiates all commands components
export default function About() {
    // function handleCamerasCallback(cameras) {
    //     console.log(cameras);
    // }

    const [selectedCameras, setSelectedCameras] = React.useState([]);

    const handleCamerasCallback = (cameras) => {
        console.log(cameras);
        // const cameraIDArray = [];
        // cameras.map((camera) => (
        //     cameraIDArray.push(camera.id)
        // ))
        setSelectedCameras(cameras);
        console.log(cameras);
    }

    return (
        <React.Fragment>
            <h1>Home</h1>
            <p>Welcome to Connected Farms Web! Here you will able to see graphs of plots and send commands to the camera.</p>
            <Grid
            container
            spacing={0}
            alignContent="center" 
            align = "center" 
            justify = "center" 
            alignItems = "center"
            >                    
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <SelectCamera cameraCallback={handleCamerasCallback}/>
                </Grid> 
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <ChangeInterval selectedCameras={selectedCameras} />
                </Grid>  
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <ChangeResolution selectedCameras={selectedCameras} />
                </Grid>  
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <ChangeImageType selectedCameras={selectedCameras} />
                </Grid>  
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <RunScript selectedCameras={selectedCameras} />
                </Grid>  
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <SetFPS selectedCameras={selectedCameras} />
                </Grid>  
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <TakeImage selectedCameras={selectedCameras} />
                </Grid>  
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <SendData selectedCameras={selectedCameras} />
                </Grid>  
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <GetStatus selectedCameras={selectedCameras} />
                </Grid>  
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <ChangeSchedule selectedCameras={selectedCameras} />
                </Grid>  
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <ChangeWidth selectedCameras={selectedCameras} />
                </Grid>       
            </Grid>


        </React.Fragment>
    )
}