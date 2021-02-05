import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import SelectCamera from './commands/SelectCamera'
import ChangeInterval from './commands/ChangeInterval'
import ChangeResolution from './commands/ChangeResolution'
import ChangeImageType from './commands/ChangeImageType'
import RunScript from './commands/RunScript'
import SetFPS from './commands/SetFPS'
import TakeImage from './commands/TakeImage'
import SendData from './commands/SendData'
import GetStatus from './commands/GetStatus'
import ChangeSchedule from './commands/ChangeSchedule'
import ChangeWidth from './commands/ChangeWidth'


const useStyles = makeStyles({
    commands: {
        justifyContent: 'center'
    }

  });


export default function About() {
    const classes = useStyles();

    return (
        <React.Fragment className={classes.commands}>
            <h1>Home</h1>
            <p>Welcome to Connected Farms Web! Here you will able to see graphs of plots and send commands to the camera.</p>
            <Grid
            container
            spacing={0}
            direction="column"
            justify="center"
            display="inline-block"
            alignItems="center"
            style={{ minHeight: '100vh' }}
            >

                <Grid item lg={10}>
                    <SelectCamera/>
                </Grid> 
                <Grid item lg={10}>
                    <ChangeInterval/>
                </Grid>  
                <Grid item lg={10}>
                    <ChangeResolution/>
                </Grid>  
                <Grid item lg={10}>
                    <ChangeImageType/>
                </Grid>  
                <Grid item lg={10}>
                    <RunScript/>
                </Grid>  
                <Grid item lg={10}>
                    <SetFPS/>
                </Grid>  
                <Grid item lg={10}>
                    <TakeImage/>
                </Grid>  
                <Grid item lg={10}>
                    <SendData/>
                </Grid>  
                <Grid item lg={10}>
                    <GetStatus/>
                </Grid>  
                <Grid item lg={10}>
                    <ChangeSchedule/>
                </Grid>  
                <Grid item lg={10}>
                    <ChangeWidth/>
                </Grid>       
            </Grid>


        </React.Fragment>
    )
}