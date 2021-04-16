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

export default function ChangeImageType(props) {
  const classes = useStyles();
  


  const [state, setState] = React.useState({
    imageType: '.jpg',
  });

  const handleChange = (event) => {
    setState({
      ...state,
      imageType: event.target.value,
    });
  };

  const finalPayload = {
    "CommandType": "imageFormat",
    "imageFormat": state.imageType
  }

  return (
    <ThemeProvider theme={DefaultTheme}>
         <Card className={classes.card} variant="outlined" color='primary'>
            <CardContent>
                <Typography variant="h5" component="h2" color='textPrimary'>
                    Change Image Type:
                </Typography>

                <FormControl className={classes.formControl}>
                <Select
                native
                value={state.imageType}
                onChange={handleChange}
                inputProps={{
                    name: 'imageType',
                    id: 'imageType-native-simple',
                }}
                >
                    <option >.jpg</option>
                    <option >.png</option>
                    <option >.bmp</option>
                </Select>
            </FormControl>

            </CardContent>
            <CardActions className={classes.button}>
                <Button size="small" color='primary' variant='contained' onClick={() => postData(finalPayload, props.selectedCameras)}>Change Image Type</Button>
            </CardActions>
        </Card>
    </ThemeProvider>
  );
}
