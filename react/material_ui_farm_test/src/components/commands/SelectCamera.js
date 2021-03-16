import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';

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
    minWidth: 275,
  },
  checkbox: {
    color: "#ffffff"
  }
});

export default function SelectCamera() {
  const classes = useStyles();

  const [value, setValue] = React.useState('female');

  const handleChangeCamera = event => {
    setValue(event.target.value);
  };

  const finalPayload = {
    "CommandType": "changeSendInterval",
    "Interval": value
  }

  return (
    <ThemeProvider theme={DefaultTheme}>
         <Card className={classes.card} variant="outlined" color='primary'>
            <CardContent>
                <Typography variant="h5" component="h2" color='textPrimary'>
                  Select Camera to Command:
                </Typography>

                <FormControl component="fieldset">
                  <FormLabel component="legend"></FormLabel>
                    <RadioGroup aria-label="position" name="position" value={value} onChange={handleChangeCamera} row>
                      <FormControlLabel style={{textColor: "#ffffff"}}
                        control={
                          <Checkbox
                            onChange={handleChangeCamera}
                            name="checkedB"
                            color="primary"
                          />
                        }
                        label={<Typography variant="body2" color="textSecondary">Camera 1</Typography>}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={handleChangeCamera}
                            name="checkedB"
                            color="primary"
                          />
                        }
                        label={<Typography variant="body2" color="textSecondary">Camera 2</Typography>}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={handleChangeCamera}
                            name="checkedB"
                            color="primary"
                          />
                        }
                        label={<Typography variant="body2" color="textSecondary">Camera 3</Typography>}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={handleChangeCamera}
                            name="checkedB"
                            color="primary"
                          />
                        }
                        label={<Typography variant="body2" color="textSecondary">Camera 4</Typography>}
                      />
                    </RadioGroup>
                  </FormControl>

            </CardContent>
            <CardActions className={classes.button}>
                <Button size="small" color='primary' variant='contained' onClick={() => postData('https://connectedfarmsnodered.mybluemix.net/command1', finalPayload)}>Select Camera</Button>
            </CardActions>
        </Card>
    </ThemeProvider>
  );
}
