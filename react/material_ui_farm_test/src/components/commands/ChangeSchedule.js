import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
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

export default function ChangeSchedule(props) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    startTime: '07:30',
    endTime: '07:30',
  });

  const handleChangeStart = (event) => {
    setState({
      ...state,
      'startTime': event.target.value,
    });
  };

  const handleChangeEnd = (event) => {
    setState({
      ...state,
      'endTime': event.target.value,
    });
  };

  const finalPayload = {
    "CommandType": "changeSendInterval",
    "startTime": state.startTime,
    "endTime": state.endTime
  }
  
  return (
    <ThemeProvider theme={DefaultTheme}>
         <Card className={classes.card} variant="outlined" color='primary'>
            <CardContent>
                <Typography variant="h5" component="h2" color='textPrimary'>
                  Change Schedule:
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                    <form className={classes.container} noValidate>
                        <TextField
                            title="start time"
                            id="time"
                            type="time"
                            defaultValue="07:30"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            inputProps={{
                            step: 300, // 5 min
                            }}
                            onChange={handleChangeStart}
                        />
                    </form>
                    </Grid>
                    <Grid item xs={6}>
                    <form className={classes.container} noValidate>
                        <TextField
                            title="end time"
                            id="time"
                            type="time"
                            defaultValue="07:30"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            inputProps={{
                            step: 300, // 5 min
                            }}
                            onChange={handleChangeEnd}
                        />
                    </form>
                    </Grid>
                </Grid>
                

                
            </CardContent>

            <CardActions className={classes.button}>
                <Button size="small" color='primary' variant='contained' onClick={() => postData(finalPayload, props.selectedCameras)}>Change Time Interval</Button>
            </CardActions>
        </Card>
    </ThemeProvider>
  );
}
