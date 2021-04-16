import { React, useEffect, useState  } from 'react';
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

export default function SelectCamera(props) {
  const classes = useStyles();

  const [value, setValue] = useState()

  const [state, setState] = useState({
    checkboxes: [
      {
        label: "Camera 1",
        checked: false
      },
      {
        label: "Camera 2",
        checked: false
      },
      {
        label: "Camera 3",
        checked: false
      },
      {
        label: "Camera 4",
        checked: false
      }
    ],
  });

  

  useEffect( () => {
    setState(pre => ({
      ...pre,
      checkboxes: [
        {
          label: "Camera 1",
          checked: false,
          id: 1,
        },
        {
          label: "Camera 2",
          checked: false,
          id: 2,
        },
        {
          label: "Camera 3",
          checked: false,
          id: 3,
        },
        {
          label: "Camera 4",
          checked: false,
          id: 4,
        },
        {
          label: "Camera 5",
          checked: false,
          id: 5,
        }
      ],
    }))
  }, []);

  const handleChangeCamera = event => {
    // console.log(event.target.value);
    setValue(event.target.value);

    let newState = state;

    newState.checkboxes.forEach((camera) => {
        if (camera.id === parseInt(event.target.value)){
            camera.checked = !camera.checked;
        }
            
    })

    console.log(JSON.stringify(newState.checkboxes))

    setState(newState)

    const selectedCamerasIDs = [];

    state.checkboxes.forEach((camera) => {
        console.log(camera)
        if(camera.checked === true){
            console.log("found " + camera.id)
            selectedCamerasIDs.push(camera.id)
        }
    })

    console.log(selectedCamerasIDs)
    props.cameraCallback(selectedCamerasIDs);
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
                    <RadioGroup aria-label="position" name="position" value={value}  row>
                      {state.checkboxes.map((checkbox, index) => (
                          <div key={index}>
                              <FormControlLabel style={{textColor: "#ffffff"}}
                                control={
                                    <Checkbox
                                    onChange={handleChangeCamera}
                                    name="checkedB"
                                    color="primary"
                                    value={checkbox.id}
                                    />
                                }
                                label={<Typography variant="body2" color="textSecondary">{checkbox.label}</Typography>}
                              />
                          </div>
                        
                      ))}
                    </RadioGroup>
                  </FormControl>

            </CardContent>
            <CardActions className={classes.button}>
                <Button size="small" color='primary' variant='contained' onClick={() => postData(finalPayload, props.selectedCameras)}>Select Camera</Button>
            </CardActions>
        </Card>
    </ThemeProvider>
  );
}
