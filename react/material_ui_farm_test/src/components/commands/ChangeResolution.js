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

export default function ChangeResolution() {
  const classes = useStyles();
  


  const [state, setState] = React.useState({
    resolution: '1920x1080',
  });

  const handleChange = (event) => {
    setState({
      ...state,
      resolution: event.target.value
    });
  };

  const finalPayload = {
    "DeviceID": "0001",
    "CommandType": "changeSendInterval",
    "imageResolutionX": state.resolution.split('x')[0],
    "imageResolutionY": state.resolution.split('x')[1]
  }

  return (
    <ThemeProvider theme={DefaultTheme}>
         <Card className={classes.card} variant="outlined" color='primary'>
            <CardContent>
                <Typography variant="h5" component="h2" color='textPrimary'>
                    Change image resolution:
                </Typography>

                <FormControl className={classes.formControl}>
                <Select
                native
                value={state.age}
                onChange={handleChange}
                inputProps={{
                    name: 'resolution',
                    id: 'age-native-simple',
                }}
                >
                    <option >1920x1080</option>
                    <option >1296x972</option>
                    <option >1296x730</option>
                    <option >640x480</option>
                </Select>
            </FormControl>

            </CardContent>
            <CardActions className={classes.button}>
                <Button size="small" color='primary' variant='contained' onClick={() => postData('https://connectedfarmsnodered.mybluemix.net/commands', finalPayload)}>Change Image Resolution</Button>
            </CardActions>
        </Card>
    </ThemeProvider>
  );
}
