import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { ThemeProvider } from '@material-ui/core/styles';

import postData from '../shared/postData';
import themeBuilder from '../themes/DefaultTheme'

const DefaultTheme = themeBuilder();

const useStyles = makeStyles({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    justifyContent: 'center'
  },
  card: {
    backgroundColor: DefaultTheme.palette.background.default,
    color: DefaultTheme.palette.primary.contrastText,
    minHeight: 160
  }
});

export default function SendData() {
  const classes = useStyles();

  const finalPayload = {
    "DeviceID": "0001",
    "CommandType":"sendSensorData"
  }
  
  return (
    <ThemeProvider theme={DefaultTheme}>
         <Card className={classes.card} variant="outlined" color='primary'>
            <CardContent>
                <Typography variant="h5" component="h2" color='textPrimary'>
                  Click Below to Send Data to Your Camera!
                </Typography>
            </CardContent>

            <CardActions className={classes.button}>
                <Button size="small" color='primary' variant='contained' onClick={() => postData('https://connectedfarmsnodered.mybluemix.net/commands', finalPayload)}>Send Data</Button>
            </CardActions>
        </Card>
    </ThemeProvider>
  );
}