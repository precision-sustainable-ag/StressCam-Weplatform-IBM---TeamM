import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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

export default function ChangeInterval() {
  const classes = useStyles();
  


  const [state, setState] = React.useState({
    interval: 5,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      interval: event.target.value
    });
  };

  const finalPayload = {
    "CommandType": "changeSendInterval",
    "Interval": state.interval
  }

  return (
    <ThemeProvider theme={DefaultTheme}>
         <Card className={classes.card} variant="outlined" color='primary'>
            <CardContent>
                <Typography variant="h5" component="h2" color='textPrimary'>
                    Change Time Interval:
                </Typography>

                <FormControl className={classes.formControl}>
                    <Select
                    native
                    value={state.interval}
                    onChange={handleChange}
                    inputProps={{
                        name: 'interval',
                        id: 'interval-native-simple',
                    }}
                    >
                        <option value={5}>5 Minutes</option>
                        <option value={10}>10 Minutes</option>
                        <option value={15}>15 Minutes</option>
                        <option value={30}>30 Minutes</option>
                        <option value={60}>60 Minutes</option>
                    </Select>
                </FormControl>

            </CardContent>
            <CardActions className={classes.button}>
                <Button size="small" color='primary' variant='contained' onClick={() => postData('https://connectedfarmsnodered.mybluemix.net/command1', finalPayload)}>Change Interval</Button>
            </CardActions>
        </Card>
    </ThemeProvider>
  );
}
