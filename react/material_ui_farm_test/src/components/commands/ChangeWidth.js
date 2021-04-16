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

export default function ChangeWidth(props) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    width: '',
    height: '',
  });

  const finalPayload = {
    "CommandType": "resizeImage",
    "Width": state.width,
    "Height": state.height
  }

  const handleChangeWidth = (event) => {
    setState({
      ...state,
      'width': event.target.value,
    });
  };

  const handleChangeHeight = (event) => {
    setState({
      ...state,
      'height': event.target.value,
    });
  };
  
  return (
    <ThemeProvider theme={DefaultTheme}>
         <Card className={classes.card} variant="outlined" color='primary'>
            <CardContent>
                <Typography variant="h5" component="h2" color='textPrimary'>
                  Resize Image:
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextField size="small" id="outlined-basic" label="Width" variant="outlined" onChange={handleChangeWidth}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField size="small" id="outlined-basic" label="Height" variant="outlined" onChange={handleChangeHeight}/>
                    </Grid>
                </Grid>
                

                
            </CardContent>

            <CardActions className={classes.button}>
                <Button size="small" color='primary' variant='contained' onClick={() => postData(finalPayload, props.selectedCameras)}>Change Image Size</Button>
            </CardActions>
        </Card>
    </ThemeProvider>
  );
}
