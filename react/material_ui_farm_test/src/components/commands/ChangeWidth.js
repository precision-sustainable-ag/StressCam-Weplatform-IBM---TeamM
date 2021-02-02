import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';

import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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
    maxWidth: 600
  }
});

export default function ChangeWidth() {
  const classes = useStyles();
  
  return (
    <ThemeProvider theme={DefaultTheme}>
         <Card className={classes.card} variant="outlined" color='primary'>
            <CardContent>
                <Typography variant="h5" component="h2" color='textPrimary'>
                  Resize Image:
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Width" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Height" variant="outlined" />
                    </Grid>
                </Grid>
                

                
            </CardContent>

            <CardActions className={classes.button}>
                <Button size="small" color='primary' variant='contained'>Change Image Size</Button>
            </CardActions>
        </Card>
    </ThemeProvider>
  );
}
