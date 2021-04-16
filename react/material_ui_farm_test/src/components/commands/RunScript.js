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

export default function RunScript(props) {
  const classes = useStyles();
  


  const [state, setState] = React.useState({
    scriptType: 'Take Image',
  });

  const handleChangeScript = (event) => {
    setState({
      ...state,
      scriptType: event.target.options[event.target.selectedIndex].value
    });
  };

  const finalPayload = {
    "CommandType": "runScript",
    "scriptType": state.scriptType
  }

  return (
    <ThemeProvider theme={DefaultTheme}>
         <Card className={classes.card} variant="outlined" color='primary'>
            <CardContent>
                <Typography variant="h5" component="h2" color='textPrimary'>
                  Select a Script to Run:
                </Typography>

                <FormControl className={classes.formControl}>
                <Select
                native
                value={state.age}
                onChange={handleChangeScript}
                inputProps={{
                    name: 'scriptType',
                    id: 'age-native-simple',
                }}
                >
                  <option >Take Image</option>
                  <option >LUX Sensor</option>
                  <option >IRT Sensor</option>
                  <option >Sync Time</option>
                  <option >Reboot</option>
                </Select>
            </FormControl>

            </CardContent>
            <CardActions className={classes.button}>
                <Button size="small" color='primary' variant='contained' onClick={() => postData(finalPayload, props.selectedCameras)}>Run Script</Button>
            </CardActions>
        </Card>
    </ThemeProvider>
  );
}
